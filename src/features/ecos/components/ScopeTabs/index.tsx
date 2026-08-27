import { Paper, Tab, Tabs } from '@mui/material';
import { ecoScopeLabels } from '../../constants';
import ScopeTabLabel from './components/ScopeTabLabel';
import { scopeTabDefinitions } from './constants';
import { shouldHighlightScopeTab } from './logic';
import type { ScopeTabsProps } from './types';

const ScopeTabs = ({ metrics, activeScope, isLoading, onSelectScope }: ScopeTabsProps) => (
  <Paper variant="outlined">
    <Tabs
      allowScrollButtonsMobile
      aria-label="ECO views"
      scrollButtons="auto"
      value={activeScope}
      variant="scrollable"
      onChange={(_, scope) => onSelectScope(scope)}
    >
      {scopeTabDefinitions.map((definition) => {
        const count = definition.getCount(metrics);

        return (
          <Tab
            disabled={isLoading}
            key={definition.scope}
            label={
              <ScopeTabLabel
                count={count}
                highlighted={!isLoading && shouldHighlightScopeTab(definition, count)}
                isLoading={isLoading}
                label={ecoScopeLabels[definition.scope]}
              />
            }
            sx={{ minHeight: 72, minWidth: 140, textTransform: 'none' }}
            value={definition.scope}
          />
        );
      })}
    </Tabs>
  </Paper>
);

export default ScopeTabs;
