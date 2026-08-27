// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ecoPriorities } from '../../../../constants';
import DetailsTab from '.';

describe('DetailsTab', () => {
  it('shows assignment and priority with focused edit commands', async () => {
    const user = userEvent.setup();
    const onEditAssignment = vi.fn();
    const onEditPriority = vi.fn();

    render(
      <DetailsTab
        eco={{
          ChangeOrder: '000000000074001',
          ClaimedBy: 'Avery Rowan',
          Priority: ecoPriorities.high,
        }}
        onEditAssignment={onEditAssignment}
        onEditPriority={onEditPriority}
      />,
    );

    expect(screen.getByText('Avery Rowan')).toBeTruthy();
    expect(screen.getByText(ecoPriorities.high)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Change assigned user' }));
    await user.click(screen.getByRole('button', { name: 'Change priority' }));

    expect(onEditAssignment).toHaveBeenCalledOnce();
    expect(onEditPriority).toHaveBeenCalledOnce();
  });
});
