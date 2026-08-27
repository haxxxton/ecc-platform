import type { EcoTableChildProps } from '../../types';

const EcoTableColumnGroup = ({ table }: Pick<EcoTableChildProps, 'table'>) => (
  <colgroup>
    {table.getAllLeafColumns().map((column) => (
      <col key={column.id} style={{ width: column.getSize() }} />
    ))}
  </colgroup>
);

export default EcoTableColumnGroup;
