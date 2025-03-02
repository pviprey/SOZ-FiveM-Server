import { ClientEvent, GameEvent, NuiEvent, ServerEvent } from '../../shared/event';
import { addMethodMetadata, setMethodMetadata } from './reflect';

export type EventMetadata = {
    name: string;
    net: boolean;
    context: boolean;
    methodName: string;
};

export const EventMetadataKey = 'soz_core.decorator.event';
export const NuiEventMetadataKey = 'soz_core.decorator.nui_event';
export const GameEventMetadataKey = 'soz_core.decorator.game.event';

export const OnEvent = (event: ServerEvent | ClientEvent, net = true): MethodDecorator => {
    return On(event.toString(), net);
};

export const On = (name?: string, net = true, context = false): MethodDecorator => {
    return (target, propertyKey) => {
        addMethodMetadata(
            EventMetadataKey,
            {
                name: name || propertyKey.toString(),
                net,
                context,
                methodName: propertyKey.toString(),
            },
            target,
            propertyKey
        );
    };
};

export const OnNuiEvent = <T = any, R = any>(event: NuiEvent, context = false) => {
    return (target, propertyKey, descriptor: TypedPropertyDescriptor<(data?: T) => Promise<R>>) => {
        addMethodMetadata(
            NuiEventMetadataKey,
            {
                name: event.toString(),
                net: false,
                context,
                methodName: propertyKey.toString(),
            },
            target,
            propertyKey
        );

        return descriptor;
    };
};

export const OnGameEvent = (event: GameEvent, context = false): MethodDecorator => {
    return (target, propertyKey) => {
        addMethodMetadata(
            GameEventMetadataKey,
            {
                name: event.toString(),
                net: false,
                context,
                methodName: propertyKey.toString(),
            },
            target,
            propertyKey
        );
    };
};

export enum OnceStep {
    Start = 'start',
    /**
     * Can only be used on the **server**.
     */
    DatabaseConnected = 'databaseConnected',
    /**
     * Can only be used on the **client**.
     */
    PlayerLoaded = 'playerLoaded',
    RepositoriesLoaded = 'repositoriesLoaded',
    Stop = 'stop',
    NuiLoaded = 'nuiLoaded',
}

export const OnceMetadataKey = 'soz_core.decorator.once';

export const Once = (step: OnceStep = OnceStep.Start): MethodDecorator => {
    return (target, propertyKey) => {
        setMethodMetadata(OnceMetadataKey, step, target, propertyKey);
    };
};
