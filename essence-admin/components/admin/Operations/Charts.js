"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

export default function Charts({ data }) {

    const options = {

        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },

        colors: ["#14c38e"],

        stroke: {
            curve: "smooth",
            width: 3,
        },

        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.35,
                opacityTo: 0,
            },
        },

        dataLabels: {
            enabled: false,
        },

        grid: {
            borderColor: "#ececec",
        },

        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },

        yaxis: {
            labels: {
                formatter: (value) => `$${value}`,
            },
        },
    };

    const series = [
        {
            name: "Revenue",
            data,
        },
    ];
    console.log(data);
    return (
        <Chart
            options={options}
            series={series}
            type="area"
            height={350}
        />
    );
}