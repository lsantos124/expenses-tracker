import moment from 'moment';
import numeral from 'numeral';

export default (expenses, { startDate, endDate }) => {
	const totalsPerDay = {};

	expenses.map((expense) => {
		const date = moment(expense.createdAt).format('MM-DD');
		const amount = expense.amount / 100.0;
		if (!(date in totalsPerDay)) {
			totalsPerDay[date] = 0.0;
		}
		totalsPerDay[date] += amount;
		totalsPerDay[date] = Math.round(totalsPerDay[date] * 100) / 100;
		return expense;
	});

	const data = []; 

	for (var m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
	  const currDate = m.format('MM-DD');
	  data.push({ 
	  	'y': (!(currDate in totalsPerDay) ? '' : totalsPerDay[currDate]),
	  	'x': currDate
	  });
	}

	return data;
};