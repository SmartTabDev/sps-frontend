import { TriggerFields } from 'pages/Notifications/utils/mapTrigger';

export type TriggerPercentage = {
  minPercentage: 0 | undefined,
  maxPercentage: 100 | 0,
}
const getTriggerPercentage = (data: TriggerFields): TriggerPercentage => {
  const { triggerValueType } = data;

  const isPercentageType = triggerValueType && triggerValueType.value === 'percentage';
  const minPercentage = isPercentageType ? 0 : undefined;
  const maxPercentage = isPercentageType ? 100 : 0;

  return {
    minPercentage,
    maxPercentage,
  };
};

export default getTriggerPercentage;
