export const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 1200;
  const months = tenure * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
};

export const calculateLoanSchedule = (principal, rate, tenure) => {
  const monthlyRate = rate / 1200;
  const months = tenure * 12;
  const emi = calculateEMI(principal, rate, tenure);

  let schedule = [];
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance -= principalPaid;

    schedule.push({
      month,
      principalPaid: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.round(Math.max(0, balance)),
    });
  }

  return schedule;
};
