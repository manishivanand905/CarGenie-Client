import React from "react";
import { TableContainer, Table, Th, Td, Tr } from "./loanScheduledTableStyles";

const LoanScheduleTable = ({ schedule }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Months</Th>
            <Th>Principle</Th>
            <Th>Interest</Th>
            <Th>Balance</Th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row) => (
            <Tr key={row.month}>
              <Td>{row.month}</Td>
              <Td>Rs. {row.principalPaid.toLocaleString()}</Td>
              <Td>Rs. {row.interest.toLocaleString()}</Td>
              <Td>Rs. {row.balance.toLocaleString()}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default LoanScheduleTable;
