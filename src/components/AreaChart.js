// Imports
import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Component
const AreaChartComponent = ({ stats }) => {

	// DEV
	// console.log(stats); // {date: 'Aug 2021', count: 4}

	// Return
	return(
		<ResponsiveContainer width="100%" height={ 300 }>
			<AreaChart data={ stats } margin={ { top:50 } }>
				<CartesianGrid strokeDasharray="3 3"/>
				{/* date because {date: 'Aug 2021', count: 4} */}
				<XAxis dataKey="date"/>
				<YAxis allowDecimals={ false }/>
				<Tooltip/>
				{/* same for count ,-) */}
				<Area type="monotone" dataKey='count' stroke="#1e3a8a" fill="#3b82f6"/>
			</AreaChart>
		</ResponsiveContainer>
	);

};

// Export
export default AreaChartComponent;