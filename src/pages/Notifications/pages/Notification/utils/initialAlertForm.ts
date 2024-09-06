const initialAlertForm = {
  startDate: null,
  endDate: null,
  name: '',
  description: '',
  emails: undefined,
  isActive: true,
  availableOnly: false,
  sensitivity: 'any' as const,
  alertType: 'all' as const,
  // new
  variantLinks: [],
  brands: [],
  categories: [],
  retailers: [],
};

export default initialAlertForm;
