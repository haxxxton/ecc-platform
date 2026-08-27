import {
  actionRequiredLabels,
  auditActions,
  categoryOptions,
  ecoPriorities,
  ecoStatuses,
  manufacturingSources,
  workflowStageCodes,
} from '../constants';
import type { Eco } from '../types';

const syntheticRecordCount = 96;
const completedRecordStart = 88;
const millisecondsPerDay = 86_400_000;

const syntheticOwners = [
  'Avery Rowan',
  'Jordan Vale',
  'Morgan Ellis',
  'Riley Hart',
  'Taylor Quinn',
  'Casey Monroe',
  'Devon Blake',
  'Skyler Reed',
  'Jamie Parker',
  'Robin Shaw',
];

const activeStages = [
  workflowStageCodes.request,
  workflowStageCodes.review,
  workflowStageCodes.drawing,
  workflowStageCodes.bom,
  workflowStageCodes.confirm,
];

const syntheticChanges = [
  {
    title: 'Improve enclosure mounting bracket',
    component: 'mounting bracket assembly',
    proposal: 'adds a locating feature and standardizes the fastener pattern',
  },
  {
    title: 'Standardize cable entry plate',
    component: 'cable entry plate',
    proposal: 'uses one hole pattern across three demonstration cabinet sizes',
  },
  {
    title: 'Update thermal validation procedure',
    component: 'thermal validation procedure',
    proposal: 'adds repeatable sensor locations and acceptance criteria',
  },
  {
    title: 'Add weather seal retention feature',
    component: 'door seal channel',
    proposal: 'introduces a retention tab to simplify assembly and inspection',
  },
  {
    title: 'Revise lifting point reinforcement',
    component: 'roof lifting point',
    proposal: 'increases local reinforcement while retaining the existing outer profile',
  },
  {
    title: 'Consolidate hinge hardware',
    component: 'hinge hardware set',
    proposal: 'replaces two equivalent fasteners with one standard item',
  },
  {
    title: 'Improve gland plate access',
    component: 'lower gland plate assembly',
    proposal: 'increases tool clearance around the removable panel',
  },
  {
    title: 'Revise protective earth label placement',
    component: 'protective earth identification label',
    proposal: 'moves the label to a location visible after equipment installation',
  },
  {
    title: 'Introduce modular equipment rail',
    component: 'internal equipment rail',
    proposal: 'adds modular fixing positions for the demonstration accessory range',
  },
  {
    title: 'Reduce door stop assembly time',
    component: 'door stop mechanism',
    proposal: 'changes the attachment method to reduce assembly steps',
  },
  {
    title: 'Update inspection gauge specification',
    component: 'final inspection gauge',
    proposal: 'clarifies datum selection and allowable measurement variation',
  },
  {
    title: 'Improve panel edge protection',
    component: 'removable panel edge trim',
    proposal: 'extends trim coverage at the upper corners',
  },
];

const syntheticReasons = [
  'Reduce assembly variation in the demonstration production flow.',
  'Improve service access while preserving the external envelope.',
  'Standardize common parts across the fictional product range.',
  'Clarify inspection requirements for repeatable acceptance testing.',
  'Address feedback identified during a synthetic design review.',
  'Simplify release documentation and downstream configuration.',
];

function dateDaysAgo(days: number) {
  return new Date(Date.now() - days * millisecondsPerDay).toISOString();
}

function getActionRequired(stage: string) {
  switch (stage) {
    case workflowStageCodes.request:
      return actionRequiredLabels.signOnRequired;
    case workflowStageCodes.review:
      return 'Technical review required';
    case workflowStageCodes.drawing:
      return 'Drawing package update required';
    case workflowStageCodes.bom:
      return 'Bill of materials review required';
    case workflowStageCodes.confirm:
      return 'Awaiting Final Signoff';
    default:
      return actionRequiredLabels.workflowComplete;
  }
}

function getPriority(index: number) {
  if (index % 5 === 0) return ecoPriorities.high;
  if (index % 3 === 0) return ecoPriorities.low;
  return ecoPriorities.medium;
}

function getSyntheticWorkflowState(index: number) {
  if (index >= completedRecordStart) {
    return {
      actionRequired: actionRequiredLabels.workflowComplete,
      stage: workflowStageCodes.closed,
      status: ecoStatuses.complete,
    };
  }

  if (index % 13 === 0) {
    return {
      actionRequired: actionRequiredLabels.rejected,
      stage: activeStages[index % activeStages.length],
      status: ecoStatuses.onHold,
    };
  }

  if (index % 17 === 0) {
    return {
      actionRequired: actionRequiredLabels.signOnRequired,
      stage: workflowStageCodes.request,
      status: ecoStatuses.new,
    };
  }

  const stage = activeStages[index % activeStages.length];
  return {
    actionRequired: getActionRequired(stage),
    stage,
    status: ecoStatuses.inProgress,
  };
}

function createSyntheticEco(index: number): Eco {
  const recordNumber = 74_001 + index;
  const changeOrder = String(recordNumber).padStart(15, '0');
  const change = syntheticChanges[index % syntheticChanges.length];
  const category = categoryOptions[index % categoryOptions.length];
  const owner = syntheticOwners[index % syntheticOwners.length];
  const raisedDaysAgo = 5 + ((index * 11) % 240);
  const isComplete = index >= completedRecordStart;
  const { actionRequired, stage, status } = getSyntheticWorkflowState(index);
  const submittedAt = dateDaysAgo(raisedDaysAgo);
  const completedAt = isComplete ? dateDaysAgo(1 + (index - completedRecordStart) * 3) : undefined;
  const latestAuditAt = completedAt ?? dateDaysAgo(Math.max(1, raisedDaysAgo - 3));

  return {
    ChangeOrder: changeOrder,
    Description: `${change.title} - Sample ${String((index % 8) + 1).padStart(2, '0')}`,
    Category: category,
    CategoryState: manufacturingSources[index % manufacturingSources.length],
    Originator: 'Northstar Workflow',
    EccUser: owner,
    StatusCode: stage,
    ActionReqd: actionRequired,
    EccStatus: status,
    Priority: getPriority(index),
    DateRaised: submittedAt,
    BomMaintAllow: index % 2 === 0 ? 'Y' : 'N',
    AuditSequence: String((index % 5) + 1),
    FullDescription: `This synthetic Northstar Engineering change updates the ${change.component} used in the ${category.toLowerCase()} demonstration range. The proposal ${change.proposal}. Validation includes a dimensional review, a representative fit check, and an updated release package. This record contains no customer, supplier, or production information.`,
    Reason: syntheticReasons[index % syntheticReasons.length],
    Notes: `Synthetic demonstration record ${recordNumber}. Confirm the sample drawing, inspection plan, and test evidence before release.`,
    ClaimedBy: index % 5 === 0 ? '' : syntheticOwners[(index + 3) % syntheticOwners.length],
    Attachments: [],
    SignoffHistory: [
      {
        User: syntheticOwners[(index + 1) % syntheticOwners.length],
        Action: auditActions.ecoSubmitted,
        Date: submittedAt,
        Comment: 'Synthetic ECO submitted for demonstration review.',
      },
      {
        User: syntheticOwners[(index + 2) % syntheticOwners.length],
        Action: actionRequired,
        Date: latestAuditAt,
        Comment: 'Sample workflow record updated using fictional engineering data.',
      },
    ],
    ApprovedBy: isComplete ? syntheticOwners[(index + 4) % syntheticOwners.length] : undefined,
    ApprovedDate: completedAt,
    CompletedDate: completedAt,
  };
}

export const sampleEcos = Array.from({ length: syntheticRecordCount }, (_, index) =>
  createSyntheticEco(index),
);
