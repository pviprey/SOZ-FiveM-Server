import { Component, Prop, WardrobeConfig } from '../cloth';
import { PlayerPedHash } from '../player';
import { NamedZone } from '../polyzone/box.zone';
import { Vehicle } from '../vehicle/vehicle';

export const UpwCloakroom: WardrobeConfig = {
    [PlayerPedHash.Male]: {
        ["Tenue d'apprenti pour été"]: {
            Components: {
                [Component.Torso]: { Palette: 0, Drawable: 41, Texture: 0 },
                [Component.Legs]: { Palette: 0, Drawable: 98, Texture: 19 },
                [Component.Shoes]: { Palette: 0, Drawable: 12, Texture: 5 },
                [Component.Accessories]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Undershirt]: { Palette: 0, Drawable: 15, Texture: 0 },
                [Component.BodyArmor]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Decals]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Tops]: { Palette: 0, Drawable: 146, Texture: 6 },
            },
            Props: { [Prop.Hat]: { Drawable: 145, Texture: 0, Palette: 0 } },
        },
        ["Tenue d'apprenti pour hiver"]: {
            Components: {
                [Component.Torso]: { Palette: 0, Drawable: 42, Texture: 0 },
                [Component.Legs]: { Palette: 0, Drawable: 98, Texture: 19 },
                [Component.Shoes]: { Palette: 0, Drawable: 12, Texture: 5 },
                [Component.Accessories]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Undershirt]: { Palette: 0, Drawable: 2, Texture: 2 },
                [Component.BodyArmor]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Decals]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Tops]: { Palette: 0, Drawable: 244, Texture: 4 },
            },
            Props: { [Prop.Hat]: { Drawable: 145, Texture: 0, Palette: 0 } },
        },
        ["Tenue d'électricien pour été"]: {
            Components: {
                [Component.Torso]: { Palette: 0, Drawable: 41, Texture: 0 },
                [Component.Legs]: { Palette: 0, Drawable: 98, Texture: 19 },
                [Component.Shoes]: { Palette: 0, Drawable: 12, Texture: 5 },
                [Component.Accessories]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Undershirt]: { Palette: 0, Drawable: 15, Texture: 0 },
                [Component.BodyArmor]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Decals]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Tops]: { Palette: 0, Drawable: 22, Texture: 1 },
            },
            Props: { [Prop.Hat]: { Drawable: 145, Texture: 1, Palette: 0 } },
        },
        ["Tenue d'électricien pour hiver"]: {
            Components: {
                [Component.Torso]: { Palette: 0, Drawable: 42, Texture: 0 },
                [Component.Legs]: { Palette: 0, Drawable: 98, Texture: 19 },
                [Component.Shoes]: { Palette: 0, Drawable: 12, Texture: 5 },
                [Component.Accessories]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Undershirt]: { Palette: 0, Drawable: 2, Texture: 2 },
                [Component.BodyArmor]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Decals]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Tops]: { Palette: 0, Drawable: 244, Texture: 6 },
            },
            Props: { [Prop.Hat]: { Drawable: 145, Texture: 1, Palette: 0 } },
        },
        ['Tenue de chef électricien pour été']: {
            Components: {
                [Component.Torso]: { Palette: 0, Drawable: 41, Texture: 0 },
                [Component.Legs]: { Palette: 0, Drawable: 98, Texture: 19 },
                [Component.Shoes]: { Palette: 0, Drawable: 12, Texture: 5 },
                [Component.Accessories]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Undershirt]: { Palette: 0, Drawable: 15, Texture: 0 },
                [Component.BodyArmor]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Decals]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Tops]: { Palette: 0, Drawable: 241, Texture: 2 },
            },
            Props: { [Prop.Hat]: { Drawable: 145, Texture: 2, Palette: 0 } },
        },
        ['Tenue de chef électricien pour hiver']: {
            Components: {
                [Component.Torso]: { Palette: 0, Drawable: 42, Texture: 0 },
                [Component.Legs]: { Palette: 0, Drawable: 98, Texture: 19 },
                [Component.Shoes]: { Palette: 0, Drawable: 12, Texture: 5 },
                [Component.Accessories]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Undershirt]: { Palette: 0, Drawable: 2, Texture: 2 },
                [Component.BodyArmor]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Decals]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Tops]: { Palette: 0, Drawable: 244, Texture: 7 },
            },
            Props: { [Prop.Hat]: { Drawable: 145, Texture: 2, Palette: 0 } },
        },
        ['Tenue de la Direction']: {
            Components: {
                [Component.Torso]: { Palette: 0, Drawable: 1, Texture: 0 },
                [Component.Legs]: { Palette: 0, Drawable: 25, Texture: 0 },
                [Component.Shoes]: { Palette: 0, Drawable: 56, Texture: 1 },
                [Component.Accessories]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Undershirt]: { Palette: 0, Drawable: 32, Texture: 0 },
                [Component.BodyArmor]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Decals]: { Palette: 0, Drawable: 0, Texture: 0 },
                [Component.Tops]: { Palette: 0, Drawable: 294, Texture: 7 },
            },
            Props: { [Prop.Hat]: { Drawable: 145, Texture: 3, Palette: 0 } },
        },
    },
    [PlayerPedHash.Female]: {
        ["Tenue d'apprentie pour été"]: {
            Components: {
                [Component.Torso]: { Texture: 0, Palette: 0, Drawable: 57 },
                [Component.Legs]: { Texture: 19, Palette: 0, Drawable: 101 },
                [Component.Shoes]: { Texture: 2, Palette: 0, Drawable: 60 },
                [Component.Accessories]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Undershirt]: { Texture: 9, Palette: 0, Drawable: 101 },
                [Component.BodyArmor]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Decals]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Tops]: { Texture: 1, Palette: 0, Drawable: 141 },
            },
            Props: { [Prop.Hat]: { Drawable: 144, Texture: 0, Palette: 0 } },
        },
        ["Tenue d'apprentie pour hiver"]: {
            Components: {
                [Component.Torso]: { Texture: 0, Palette: 0, Drawable: 46 },
                [Component.Legs]: { Texture: 19, Palette: 0, Drawable: 101 },
                [Component.Shoes]: { Texture: 2, Palette: 0, Drawable: 60 },
                [Component.Accessories]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Undershirt]: { Texture: 5, Palette: 0, Drawable: 213 },
                [Component.BodyArmor]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Decals]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Tops]: { Texture: 4, Palette: 0, Drawable: 252 },
            },
            Props: { [Prop.Hat]: { Drawable: 144, Texture: 0, Palette: 0 } },
        },
        ["Tenue d'électricienne pour été"]: {
            Components: {
                [Component.Torso]: { Texture: 0, Palette: 0, Drawable: 57 },
                [Component.Legs]: { Texture: 19, Palette: 0, Drawable: 101 },
                [Component.Shoes]: { Texture: 2, Palette: 0, Drawable: 60 },
                [Component.Accessories]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Undershirt]: { Texture: 9, Palette: 0, Drawable: 101 },
                [Component.BodyArmor]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Decals]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Tops]: { Texture: 1, Palette: 0, Drawable: 286 },
            },
            Props: { [Prop.Hat]: { Drawable: 144, Texture: 1, Palette: 0 } },
        },
        ["Tenue d'électricienne pour hiver"]: {
            Components: {
                [Component.Torso]: { Texture: 0, Palette: 0, Drawable: 46 },
                [Component.Legs]: { Texture: 19, Palette: 0, Drawable: 101 },
                [Component.Shoes]: { Texture: 2, Palette: 0, Drawable: 60 },
                [Component.Accessories]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Undershirt]: { Texture: 5, Palette: 0, Drawable: 213 },
                [Component.BodyArmor]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Decals]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Tops]: { Texture: 6, Palette: 0, Drawable: 252 },
            },
            Props: { [Prop.Hat]: { Drawable: 144, Texture: 1, Palette: 0 } },
        },
        ['Tenue de cheffe électricienne pour été']: {
            Components: {
                [Component.Torso]: { Texture: 0, Palette: 0, Drawable: 57 },
                [Component.Legs]: { Texture: 19, Palette: 0, Drawable: 101 },
                [Component.Shoes]: { Texture: 2, Palette: 0, Drawable: 60 },
                [Component.Accessories]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Undershirt]: { Texture: 9, Palette: 0, Drawable: 101 },
                [Component.BodyArmor]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Decals]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Tops]: { Texture: 2, Palette: 0, Drawable: 249 },
            },
            Props: { [Prop.Hat]: { Drawable: 144, Texture: 2, Palette: 0 } },
        },
        ['Tenue de cheffe électricienne pour hiver']: {
            Components: {
                [Component.Torso]: { Texture: 0, Palette: 0, Drawable: 46 },
                [Component.Legs]: { Texture: 19, Palette: 0, Drawable: 101 },
                [Component.Shoes]: { Texture: 2, Palette: 0, Drawable: 60 },
                [Component.Accessories]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Undershirt]: { Texture: 5, Palette: 0, Drawable: 213 },
                [Component.BodyArmor]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Decals]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Tops]: { Texture: 7, Palette: 0, Drawable: 252 },
            },
            Props: { [Prop.Hat]: { Drawable: 144, Texture: 2, Palette: 0 } },
        },
        ['Tenue de la Direction']: {
            Components: {
                [Component.Torso]: { Texture: 0, Palette: 0, Drawable: 5 },
                [Component.Legs]: { Texture: 0, Palette: 0, Drawable: 133 },
                [Component.Shoes]: { Texture: 0, Palette: 0, Drawable: 27 },
                [Component.Accessories]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Undershirt]: { Texture: 6, Palette: 0, Drawable: 217 },
                [Component.BodyArmor]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Decals]: { Texture: 0, Palette: 0, Drawable: 0 },
                [Component.Tops]: { Texture: 2, Palette: 0, Drawable: 6 },
            },
            Props: { [Prop.Hat]: { Drawable: 144, Texture: 3, Palette: 0 } },
        },
    },
};

export type UpwFacilityType =
    | 'inverter'
    | 'plant'
    | 'resell'
    | 'terminal'
    | 'jobTerminal'
    | 'globalTerminal'
    | 'charger';

export type UpwFacility = {
    type: UpwFacilityType;
    identifier: number;
    data: string;
};

export type UpwOrder = {
    uuid: string;
    model: string;
    orderDate: string;
};

const orderZone: NamedZone = {
    name: 'upw_order',
    center: [609.3484, 2759.589, 40.85264],
    length: 1.15,
    width: 2.5,
    minZ: 41.7,
    maxZ: 42.25,
    heading: 365,
    debugPoly: false,
};

export const UpwConfig = {
    Order: {
        zone: orderZone,
        waitingTime: 60, // In minutes
    },
};

export const UPW_CHARGER_REFILL_VALUES: Record<string, number> = {
    ['energy_cell_fossil']: 40,
    ['energy_cell_hydro']: 30,
    ['energy_cell_wind']: 20,
};

export type MenuUpwData = {
    blips: {
        inverter: boolean;
        jobTerminal: boolean;
        globalTerminal: boolean;
        plant: boolean;
        resell: boolean;
        charger: boolean;
    };
};

export type UpwOrderMenuData = {
    catalog: Vehicle[];
};
