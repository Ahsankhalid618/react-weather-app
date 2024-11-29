import { useEffect, useState } from "react";
import {
    Customized,
    Line,
    LineChart,
    ResponsiveContainer,
    Text,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { getTempArrayForGraph } from "../helper/fetchData";
import { getWeatherIcon } from "../helper/iconHelper";
import { Moon, MoonIcon, Sun } from "lucide-react";

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
        <ResponsiveContainer
            width={"100%"}
            height={"100%"}
            style={{
                // padding: "1rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // borderRadius: "1rem",
            }}
        >
            <LineChart
                // width={"100%"}
                // height={300}
                data={graphData}
                style={{
                    borderRadius: "1rem",
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
                        <stop
                            offset="50%"
                            stopColor="#FFA500"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#FFFF00"
                            stopOpacity={0.75}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    xAxisId={"checking"}
                    dataKey={"time"}
                    height={50}
                    axisLine={false}
                    tickLine={false}
                    fontSize={"10px"}
                    textAnchor="center"
                    tick={<CustomTick graphData={graphData} />}
                    interval={"preserveStartEnd"}
                    tickMargin={0}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    width={0}
                    interval={"preserveStartEnd"}
                    fontSize={"0px"}
                    domain={["auto", "auto"]}
                />
                <Tooltip content={<CustomContent />} />

                <Line
                    type="monotone"
                    dataKey="temp"
                    strokeWidth={3}
                    stroke="url(#colorUv)"
                    xAxisId={"checking"}
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

function CustomTick({ graphData, ...props }) {
    console.log(props, graphData);

    return (
        <svg>
            {getWeatherIcon(graphData[props.index].weather, {
                x: props.x - parseInt(props.height / 4),
                y: props.y,
                fill: "white",
            })}

            <Text
                x={props.x - parseInt(props.height / 2)}
                y={props.y + 33}
                className="custom-tick"
            >
                {`${graphData[props.index].temp}ºC`}
            </Text>
        </svg>
    );
}

export default Graph;
