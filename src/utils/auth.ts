import {
  DigitalShelfServices,
  MarketplaceServices,
  PriceAnalysisServices,
} from 'reducers/auth/auth';

const isSubModule =
  (compatibilityService: string, moduleServices: string[]) =>
  (accessServices: string[], service: string): boolean => {
    if (!moduleServices.length) return false;
    if (!accessServices.length) return false;

    const availableModuleServices = accessServices.filter((s) =>
      moduleServices.includes(s)
    );

    if (
      accessServices.includes(compatibilityService) ||
      availableModuleServices.includes(service)
    ) {
      return true;
    }

    return false;
  };

const isModule =
  (moduleServices: string[]) =>
  (services: string[]): boolean => {
    if (!moduleServices.length) return false;
    if (!services.length) return false;

    if (services.find((s) => moduleServices.includes(s))) {
      return true;
    }

    return false;
  };

export const isDigitalShelfSubmodule = isSubModule('kpi', [
  ...DigitalShelfServices,
]);
export const isDigitalShelfModule = isModule([...DigitalShelfServices]);
export const isMarketplaceModule = isModule([...MarketplaceServices]);
export const isPriceAnalysisModule = isModule([...PriceAnalysisServices]);
