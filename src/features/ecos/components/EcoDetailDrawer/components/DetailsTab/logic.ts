import type { Eco } from '../../../../types';

export const getDetailsRows = (eco: Eco): Array<[string, string | number | undefined]> => [
  ['Category', eco.Category],
  ['Manufacturing Source', eco.CategoryState],
  ['Originator', eco.Originator],
  ['Owner', eco.EccUser],
  ['Stage', eco.StatusCode],
  ['Action Required', eco.ActionReqd],
  ['Date Raised', eco.DateRaised],
  ['Priority Score', eco.PriorityScore || 'Not assessed'],
  ['Reason', eco.Reason],
  ['Full Description', eco.FullDescription || 'No full description recorded'],
  ['Notes', eco.Notes],
];
