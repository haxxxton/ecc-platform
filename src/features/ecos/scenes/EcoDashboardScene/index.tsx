import { Alert, Box, Container, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import ScopeTabs from '../../components/ScopeTabs';
import ExecutiveDashboard from '../../components/ExecutiveDashboard';
import ResponsiveEcoFilters from '../../components/ResponsiveEcoFilters';
import EcoTable from '../../components/EcoTable';
import EcoDetailDrawer from '../../components/EcoDetailDrawer';
import CreateEcoDialog from '../../components/CreateEcoDialog';
import { useEcoFilters } from '../../hooks/useEcoFilters';
import { useEcoFormDefaults } from '../../hooks/useEcoFormDefaults';
import { useEcos } from '../../hooks/useEcos';
import { useStickyStack } from '../../hooks/useStickyStack';
import { stickyStackLayout } from '../../hooks/useStickyStack/constants';
import { getUniqueEcoValues } from '../../logic/ecoFilters';
import { buildMetrics } from '../../logic/ecoMetrics';
import { isDraftStatus } from '../../logic/ecoStatus';
import type { CreateEcoInput, Eco, EcoFilters, EcoScope } from '../../types';
import { fullBleedStickySurface } from './constants';

const EcoDashboardScene = () => {
  const {
    ecos,
    isLoading,
    isError,
    syncStatus,
    saveDraft,
    submitEco,
    deleteDraft,
    actionEco,
    assignEco,
    updatePriority,
    addAttachments,
  } = useEcos();
  const { scope, setScope, filters, updateFilter, clearFilters, scopedEcos, filteredEcos } =
    useEcoFilters(ecos);
  const metrics = useMemo(() => buildMetrics(ecos), [ecos]);
  const { filtersRef, headerRef, rootRef, scopeTabsRef } = useStickyStack();
  const ownerOptions = useMemo(() => getUniqueEcoValues(ecos, 'EccUser'), [ecos]);
  const [selectedEcoId, setSelectedEcoId] = useState<string>();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState<string>();

  const selectedEco = ecos.find((eco) => eco.ChangeOrder === selectedEcoId);
  const editingDraft = ecos.find(
    (eco) => eco.ChangeOrder === editingDraftId && isDraftStatus(eco.EccStatus),
  );
  const formDefaults = useEcoFormDefaults(editingDraft);

  const openCreate = () => {
    setEditingDraftId(undefined);
    setCreateOpen(true);
  };

  const showDrafts = () => {
    setScope('draft');
  };

  const selectScope = (nextScope: EcoScope) => {
    setScope(nextScope);
  };

  const selectFilter = <Key extends keyof EcoFilters>(key: Key, value: EcoFilters[Key]) => {
    setScope('active');
    updateFilter(key, value);
  };

  const handleOpenEco = (eco: Eco) => {
    if (isDraftStatus(eco.EccStatus)) {
      setEditingDraftId(eco.ChangeOrder);
      setCreateOpen(true);
      return;
    }
    setSelectedEcoId(eco.ChangeOrder);
  };

  const closeCreate = () => {
    setCreateOpen(false);
    setEditingDraftId(undefined);
  };

  const saveDraftWithFiles = async (input: CreateEcoInput, files: File[], existing?: Eco) => {
    const draft = await saveDraft.mutateAsync({ input, existing });
    if (files.length) addAttachments(draft, files);
  };

  const submitEcoWithFiles = async (input: CreateEcoInput, files: File[], existing?: Eco) => {
    const submitted = await submitEco.mutateAsync({ input, existing });
    if (files.length) addAttachments(submitted, files);
  };

  const deleteDraftAndClose = (ecoId: string) => {
    if (!window.confirm('Delete this draft ECO? This cannot be undone.')) return;
    deleteDraft(ecoId);
    closeCreate();
  };

  return (
    <Box
      ref={rootRef}
      sx={{
        minHeight: '100vh',
        [stickyStackLayout.variables.headerHeight]: `${stickyStackLayout.fallbackHeights.header}px`,
        [stickyStackLayout.variables.scopeTabsHeight]:
          `${stickyStackLayout.fallbackHeights.scopeTabs}px`,
        [stickyStackLayout.variables.filtersHeight]:
          `${stickyStackLayout.fallbackHeights.filters}px`,
      }}
    >
      <Box
        ref={headerRef}
        sx={{
          position: 'sticky',
          top: stickyStackLayout.top.header,
          zIndex: stickyStackLayout.zIndex.header,
        }}
      >
        <HeaderBar
          draftCount={metrics.drafts.length}
          isLoading={isLoading}
          onCreate={openCreate}
          onShowDrafts={showDrafts}
          syncStatus={syncStatus}
        />
      </Box>
      <Container maxWidth={false} sx={{ py: 2.5 }}>
        <Stack spacing={2.5}>
          {isError && (
            <Alert severity="error">Unable to load ECO data from the configured service.</Alert>
          )}
          <Box
            ref={scopeTabsRef}
            sx={{
              ...fullBleedStickySurface,
              position: 'sticky',
              top: stickyStackLayout.top.scopeTabs,
              zIndex: stickyStackLayout.zIndex.scopeTabs,
            }}
          >
            <ScopeTabs
              metrics={metrics}
              activeScope={scope}
              isLoading={isLoading}
              onSelectScope={selectScope}
            />
          </Box>
          <ExecutiveDashboard isLoading={isLoading} metrics={metrics} onFilter={selectFilter} />
          <Box
            ref={filtersRef}
            sx={{
              ...fullBleedStickySurface,
              position: 'sticky',
              top: stickyStackLayout.top.filters,
              zIndex: stickyStackLayout.zIndex.filters,
            }}
          >
            <ResponsiveEcoFilters
              ecos={ecos}
              filters={filters}
              isLoading={isLoading}
              visibleCount={filteredEcos.length}
              totalCount={scopedEcos.length}
              ownerOptions={ownerOptions}
              scope={scope}
              onFilter={updateFilter}
              onScope={setScope}
              onClear={clearFilters}
            />
          </Box>
          <EcoTable ecos={filteredEcos} isLoading={isLoading} onOpenEco={handleOpenEco} />
        </Stack>
      </Container>
      <EcoDetailDrawer
        eco={selectedEco}
        open={Boolean(selectedEco)}
        userOptions={ownerOptions}
        onClose={() => setSelectedEcoId(undefined)}
        onAssign={assignEco}
        onPriority={updatePriority}
        onWorkflowAction={actionEco}
        onAddAttachments={addAttachments}
      />
      <CreateEcoDialog
        open={createOpen}
        defaults={formDefaults}
        ownerOptions={ownerOptions}
        editingDraft={editingDraft}
        onClose={closeCreate}
        onSaveDraft={saveDraftWithFiles}
        onSubmitEco={submitEcoWithFiles}
        onDeleteDraft={deleteDraftAndClose}
      />
    </Box>
  );
};

export default EcoDashboardScene;
