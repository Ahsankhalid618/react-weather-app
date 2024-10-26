import { useEffect, useState } from "react";
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { getTempArrayForGraph } from "../helper/fetchData";

function Graph({ data }) {
    const [graphData, setGraphData] = useState(null);
    useEffect(() => {
        // console.log(data);
        const res = getTempArrayForGraph(data);
        console.log(res);
        setGraphData(res);
    }, [data]);

    if (!graphData) {
        return <div>no data available</div>;
    }
    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart
                width={500}
                height={300}
                data={graphData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis
                    dataKey={"time"}
                    allowDataOverflow
                    strokeWidth={"0.5px"}
                    fontSize={"10px"}
                    stroke="white"
                />
                <YAxis strokeWidth={"0.5px"} fontSize={"10px"} stroke="white" />
                <Tooltip content={<CustomContent />} />
                <Legend verticalAlign="top" />

                <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="white"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

function CustomContent({ active, payload, label }) {
    if (!active) {
        return null;
    }

    const { date, time, temp } = payload[0].payload;
    return (
        <div className="custom-content">
            <h6>date: {date}</h6>
            <h6>time: {time}H</h6>
            <h6>temperature: {temp}ºC</h6>
        </div>
    );
}

export default Graph;
