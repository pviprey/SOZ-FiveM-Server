import { Tick } from '@public/core/decorators/tick';
import { wait } from '@public/core/utils';

import { DealershipConfig, DealershipConfigItem, DealershipJob, DealershipType } from '../../config/dealership';
import { Once, OnceStep, OnEvent, OnNuiEvent } from '../../core/decorators/event';
import { Inject } from '../../core/decorators/injectable';
import { Provider } from '../../core/decorators/provider';
import { emitRpc } from '../../core/rpc';
import { ClientEvent, NuiEvent } from '../../shared/event';
import { Feature, isFeatureEnabled } from '../../shared/features';
import { JobPermission } from '../../shared/job';
import { MenuType } from '../../shared/nui/menu';
import { getRandomItem } from '../../shared/random';
import { Err, Ok } from '../../shared/result';
import { RpcServerEvent } from '../../shared/rpc';
import { AuctionVehicle, ShowVehicle } from '../../shared/vehicle/auction';
import { Vehicle, VehicleDealershipMenuData } from '../../shared/vehicle/vehicle';
import { BlipFactory } from '../blip';
import { JobPermissionService } from '../job/job.permission.service';
import { Notifier } from '../notifier';
import { InputService } from '../nui/input.service';
import { NuiMenu } from '../nui/nui.menu';
import { PlayerService } from '../player/player.service';
import { ResourceLoader } from '../resources/resource.loader';
import { TargetFactory } from '../target/target.factory';
import { VehicleService } from './vehicle.service';

@Provider()
export class VehicleDealershipProvider {
    @Inject(TargetFactory)
    private targetFactory: TargetFactory;

    @Inject(BlipFactory)
    private blipFactory: BlipFactory;

    @Inject(NuiMenu)
    private nuiMenu: NuiMenu;

    @Inject(VehicleService)
    private vehicleService: VehicleService;

    @Inject(ResourceLoader)
    private resourceLoader: ResourceLoader;

    @Inject(PlayerService)
    private playerService: PlayerService;

    @Inject(JobPermissionService)
    private jobPermissionService: JobPermissionService;

    @Inject(InputService)
    private inputService: InputService;

    @Inject(Notifier)
    private notifier: Notifier;

    private lastVehicleShowroom: number | null = null;

    private auctionVehicles: Record<string, AuctionVehicle> = {};

    private electricShowVehicles: Record<number, ShowVehicle> = {
        [1]: {
            position: [-59.5, 65.61, 71.97, 173.62],
            model: 'omnisegt',
            entity: null,
            rotSpeed: 0.2,
        },
        [2]: {
            position: [-76.05, 76.71, 71.97, 8.85],
            model: 'iwagen',
            entity: null,
            rotSpeed: 0.2,
        },
    };

    @Tick(20)
    public async onTick() {
        for (const [, vehicle] of Object.entries(this.electricShowVehicles)) {
            if (vehicle.entity === null) {
                return;
            }

            const heading = GetEntityHeading(vehicle.entity);
            const newHeading = heading + vehicle.rotSpeed;

            SetEntityHeading(vehicle.entity, newHeading);
        }
    }

    @Once(OnceStep.PlayerLoaded)
    public async onPlayerLoaded() {
        for (const [dealership, config] of Object.entries(DealershipConfig)) {
            if (!isFeatureEnabled(Feature.Boat) && dealership === DealershipType.Boat) {
                continue;
            }

            this.blipFactory.create(`dealership_${dealership}`, {
                name: config.blip.name,
                sprite: config.blip.sprite,
                color: config.blip.color,
                coords: {
                    x: config.position[0],
                    y: config.position[1],
                    z: config.position[2],
                },
            });

            await this.targetFactory.createForPed({
                model: config.ped,
                invincible: true,
                freeze: true,
                spawnNow: true,
                blockevents: true,
                coords: {
                    x: config.position[0],
                    y: config.position[1],
                    z: config.position[2],
                    w: config.position[3],
                },
                target: {
                    options: [
                        {
                            icon: 'c:dealership/list.png',
                            label: 'Accéder au catalogue',
                            blackoutGlobal: true,
                            action: () => {
                                this.openDealership(dealership as DealershipType, config);
                            },
                            canInteract: () => true,
                        },
                    ],
                    distance: 2.5,
                },
            });
        }

        this.blipFactory.create('dealership_job', {
            name: DealershipJob.blip.name,
            coords: { x: DealershipJob.position[0], y: DealershipJob.position[1], z: DealershipJob.position[2] },
            sprite: DealershipJob.blip.sprite,
        });

        await this.targetFactory.createForPed({
            model: DealershipJob.ped,
            invincible: true,
            freeze: true,
            spawnNow: true,
            coords: {
                x: DealershipJob.position[0],
                y: DealershipJob.position[1],
                z: DealershipJob.position[2],
                w: DealershipJob.position[3],
            },
            target: {
                options: [
                    {
                        icon: 'c:dealership/list.png',
                        label: 'Accéder au catalogue',
                        action: () => {
                            this.openJobDealership();
                        },
                        canInteract: () => {
                            const player = this.playerService.getPlayer();

                            if (!player) {
                                return false;
                            }

                            return player.job.onduty;
                        },
                    },
                ],
                distance: 2.5,
            },
        });

        this.blipFactory.create(`dealership_luxury`, {
            name: 'Concessionnaire Auto Sportive',
            coords: { x: -795.77, y: -243.88, z: 37.07 },
            sprite: 523,
            color: 46,
        });

        this.auctionVehicles = await emitRpc<Record<string, AuctionVehicle>>(
            RpcServerEvent.VEHICLE_DEALERSHIP_GET_AUCTIONS
        );

        for (const [name, auction] of Object.entries(this.auctionVehicles)) {
            await this.resourceLoader.loadModel(auction.vehicle.hash);

            const createdVehicle = CreateVehicle(
                auction.vehicle.hash,
                auction.position[0],
                auction.position[1],
                auction.position[2],
                auction.position[3],
                false,
                false
            );

            SetEntityInvincible(createdVehicle, true);
            SetVehicleDirtLevel(createdVehicle, 0);
            FreezeEntityPosition(createdVehicle, true);
            SetVehicleNumberPlateText(createdVehicle, 'LUXURY');

            this.targetFactory.createForBoxZone(`auction_${name}`, auction.windows, [
                {
                    icon: 'c:dealership/bid.png',
                    label: 'Voir la vente',
                    canInteract: () => true,
                    action: () => {
                        this.openLuxuryDealership(name);
                    },
                },
            ]);
        }

        for (const [id, vehicle] of Object.entries(this.electricShowVehicles)) {
            await this.resourceLoader.loadModel(GetHashKey(vehicle.model));

            const createdVehicle = CreateVehicle(
                GetHashKey(vehicle.model),
                vehicle.position[0],
                vehicle.position[1],
                vehicle.position[2] - 1.0,
                vehicle.position[3],
                false,
                false
            );
            this.electricShowVehicles[id].entity = createdVehicle;

            SetEntityInvincible(createdVehicle, true);
            SetVehicleDirtLevel(createdVehicle, 0);
            FreezeEntityPosition(createdVehicle, true);
            SetVehicleNumberPlateText(createdVehicle, 'ELEC');
            SetVehicleDoorsLocked(createdVehicle, 2);
        }
    }

    @OnEvent(ClientEvent.VEHICLE_DEALERSHIP_AUCTION_UPDATE)
    public onAuctionUpdate(auctionVehicles: Record<string, AuctionVehicle>) {
        this.auctionVehicles = auctionVehicles;
    }

    @OnNuiEvent<{ name: string }>(NuiEvent.VehicleAuctionBid)
    public async onAuctionBid({ name }: { name: string }) {
        const auction = this.auctionVehicles[name];

        if (!auction) {
            this.notifier.notify(`Cette enchère n'existe plus.`, 'error');
            this.nuiMenu.closeMenu();

            return;
        }

        const input = await this.inputService.askInput(
            {
                title: "Montant de l'enchère",
                defaultValue: auction.bestBid ? auction.bestBid.price.toString() : auction.vehicle.price.toString(),
            },
            (input: string) => {
                const amount = parseInt(input);

                if (!amount) {
                    return Err('Montant invalide.');
                }

                if (amount <= auction.vehicle.price) {
                    return Err('Le montant doit être supérieur au prix de base.');
                }

                if (auction.bestBid && amount <= auction.bestBid?.price) {
                    return Err("Le montant doit être supérieur à l'enchère actuelle.");
                }

                return Ok(amount);
            }
        );

        const amount = parseInt(input);
        const hasBid = await emitRpc<boolean>(RpcServerEvent.VEHICLE_DEALERSHIP_AUCTION_BID, name, amount);

        if (hasBid) {
            this.nuiMenu.closeMenu();
        }
    }

    @OnNuiEvent<{ vehicle: Vehicle; dealership: DealershipConfigItem }>(NuiEvent.VehicleDealershipShowVehicle)
    public async showVehicle({ vehicle, dealership }): Promise<void> {
        if (this.lastVehicleShowroom) {
            SetEntityAsMissionEntity(this.lastVehicleShowroom, true, true);
            DeleteVehicle(this.lastVehicleShowroom);

            this.lastVehicleShowroom = null;
        }

        if (!dealership) {
            return;
        }

        await this.resourceLoader.loadModel(vehicle.hash);

        if (this.lastVehicleShowroom) {
            this.resourceLoader.unloadModel(vehicle.hash);

            return;
        }

        const vehicleEntity = CreateVehicle(
            vehicle.hash,
            dealership.showroom.position[0],
            dealership.showroom.position[1],
            dealership.showroom.position[2],
            dealership.showroom.position[3],
            false,
            false
        );

        SetVehicleOnGroundProperly(vehicleEntity);
        SetEntityInvincible(vehicleEntity, true);
        SetVehicleDoorsLocked(vehicleEntity, 6);
        FreezeEntityPosition(vehicleEntity, true);
        SetVehicleNumberPlateText(vehicleEntity, 'SOZ');

        this.lastVehicleShowroom = vehicleEntity;
    }

    @OnNuiEvent<{ vehicle: Vehicle; dealershipId: string; dealership: DealershipConfigItem }>(
        NuiEvent.VehicleDealershipBuyVehicle
    )
    public async buyVehicle({ vehicle, dealershipId, dealership }): Promise<void> {
        let parkingPlace = null;

        if (dealershipId === DealershipType.Job) {
            const freePlaces = [];

            for (const parkingPlace of DealershipJob.parkingPlaces) {
                if (
                    !IsPositionOccupied(
                        parkingPlace.center[0],
                        parkingPlace.center[1],
                        parkingPlace.center[2],
                        0.5,
                        false,
                        true,
                        true,
                        false,
                        false,
                        0,
                        false
                    )
                ) {
                    freePlaces.push(parkingPlace);
                }
            }

            if (freePlaces.length === 0) {
                this.notifier.notify('Aucune place de parking disponible', 'error');

                return;
            }

            parkingPlace = getRandomItem(freePlaces);
        }

        const bought = await emitRpc(
            RpcServerEvent.VEHICLE_DEALERSHIP_BUY,
            vehicle,
            dealershipId,
            dealership,
            parkingPlace
        );

        if (bought) {
            this.clearMenu();
            this.nuiMenu.closeMenu();
        }
    }

    @OnNuiEvent<{ menuType: MenuType; menuData: VehicleDealershipMenuData }>(NuiEvent.MenuClosed)
    public async onMenuClose({ menuType }) {
        if (menuType !== MenuType.VehicleDealership) {
            return;
        }

        this.clearMenu();
    }

    private clearMenu() {
        if (this.lastVehicleShowroom) {
            SetEntityAsMissionEntity(this.lastVehicleShowroom, true, true);
            DeleteVehicle(this.lastVehicleShowroom);

            this.lastVehicleShowroom = null;
        }

        RenderScriptCams(false, false, 0, false, false);
        DestroyAllCams(true);
        SetFocusEntity(GetPlayerPed(PlayerId()));
    }

    public async openDealership(dealershipType: DealershipType, config: DealershipConfigItem) {
        const vehicles = await emitRpc<Vehicle[]>(RpcServerEvent.VEHICLE_DEALERSHIP_GET_LIST, dealershipType);

        const vehicle = this.vehicleService.getClosestVehicle({
            position: config.showroom.position,
            maxDistance: 3.0,
        });

        if (vehicle) {
            this.notifier.notify('Un véhicule est trop proche du showroom.', 'error');

            return;
        }

        this.nuiMenu.openMenu(
            MenuType.VehicleDealership,
            {
                name: config.blip.name,
                dealership: config,
                dealershipId: dealershipType,
                vehicles,
            },
            {
                position: {
                    position: config.position,
                    distance: 3.0,
                },
            }
        );

        const camera = CreateCamWithParams(
            'DEFAULT_SCRIPTED_CAMERA',
            config.showroom.camera[0],
            config.showroom.camera[1],
            config.showroom.camera[2],
            0.0,
            0.0,
            0.0,
            60.0,
            false,
            0
        );

        PointCamAtCoord(camera, config.showroom.position[0], config.showroom.position[1], config.showroom.position[2]);
        SetCamActive(camera, true);
        RenderScriptCams(true, true, 1, true, true);

        while (IsCamActive(camera)) {
            DisablePlayerFiring(PlayerId(), true); // Disable weapon firing
            DisableControlAction(0, 24, true); // disable attack
            DisableControlAction(0, 25, true); // disable aim
            DisableControlAction(0, 29, true); // disable ability secondary (B)
            DisableControlAction(0, 44, true); // disable cover
            DisableControlAction(1, 37, true); // disable weapon select
            DisableControlAction(0, 47, true); // disable weapon
            DisableControlAction(0, 58, true); // disable weapon
            DisableControlAction(0, 140, true); // disable melee
            DisableControlAction(0, 141, true); // disable melee
            DisableControlAction(0, 142, true); // disable melee
            DisableControlAction(0, 143, true); // disable melee
            DisableControlAction(0, 263, true); // disable melee
            DisableControlAction(0, 264, true); // disable melee
            DisableControlAction(0, 257, true); // disable melee

            await wait(0);
        }
    }

    public async openJobDealership() {
        const player = this.playerService.getPlayer();

        if (!player) {
            return;
        }

        if (!this.jobPermissionService.hasPermission(player.job.id, JobPermission.SocietyDealershipVehicle)) {
            this.notifier.notify("Vous n'avez pas les droits d'accéder au concessionnaire.", 'error');

            return;
        }

        const vehicles = await emitRpc<Vehicle[]>(RpcServerEvent.VEHICLE_DEALERSHIP_GET_LIST_JOB, player.job.id);

        this.nuiMenu.openMenu(
            MenuType.VehicleDealership,
            {
                name: 'Concessionnaire entreprise',
                dealershipId: DealershipType.Job,
                vehicles,
            },
            {
                position: {
                    position: DealershipJob.position,
                    distance: 3.0,
                },
            }
        );
    }

    public async openLuxuryDealership(name: string) {
        const player = this.playerService.getPlayer();

        if (!player) {
            return;
        }

        const auction = this.auctionVehicles[name] || null;

        if (!auction) {
            this.notifier.notify(`Cette enchère n'existe plus.`, 'error');

            return;
        }

        const requiredLicense = auction.vehicle.requiredLicence;

        if (
            requiredLicense &&
            (!player.metadata.licences[requiredLicense] || player.metadata.licences[requiredLicense] < 1)
        ) {
            this.notifier.notify(`Vous n'avez pas le permis requis pour cette enchère.`, 'error');

            return;
        }

        this.nuiMenu.openMenu(
            MenuType.VehicleAuction,
            {
                name,
                auction,
            },
            {
                position: {
                    position: auction.windows.center,
                    distance: 5.0,
                },
            }
        );
    }
}
