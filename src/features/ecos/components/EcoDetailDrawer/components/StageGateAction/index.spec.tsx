// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { workflowStageCodes } from '../../../../constants';
import StageGateAction from '.';

describe('StageGateAction', () => {
  it('labels approval with its workflow outcome', () => {
    render(
      <StageGateAction
        comment=""
        eco={{ ChangeOrder: '000000000074001', StatusCode: workflowStageCodes.request }}
        isWorkflowActionPending={false}
        onCommentChange={vi.fn()}
        onRunWorkflowAction={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Move to Review' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Approve' })).toBeNull();
  });
});
