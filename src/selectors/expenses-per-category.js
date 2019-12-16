import moment from 'moment';

// [
//     {angle: 12.13, color: '#FDA1FF', name: 'green', opacity: 0.2},
//     {angle: 12.00, color: '#FE9200', name: 'yellow'},
//     {angle: 21.00, color: '#F44E3B', name: 'cyan'},
//     {angle: 0, color: '#68CCCA', name: 'magenta'},
//     {angle: 0, color: '#FFFFFF', name: 'yellow again'}
// ]

export default (expenses, categories) => {
	const totalsPerCategory = {};

    expenses.map((expense) => {
        const amount = expense.amount / 100.0;
        const category = expense.category;

        if (!(category in totalsPerCategory)) {
            totalsPerCategory[category] = 0.0;
        }
        totalsPerCategory[category] += amount;
		totalsPerCategory[category] = Math.round(totalsPerCategory[category] * 100) / 100;

        return expense;
    });

	const data = []; 

    for (const key in totalsPerCategory) {
        let color, name;
        categories.map((category) => {
            if (key == category.title) {
                color = category.color;
                name = category.title;
            }
        });

        data.push({
            angle: totalsPerCategory[key],
            color,
            name
        }); 
    }

	return data;
};