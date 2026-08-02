import { Component, createEffect, onCleanup } from "solid-js";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { CompareRow } from "../../functions/months";

Chart.register(PieController, ArcElement, Tooltip, Legend);

interface Props {
    data: CompareRow[];
}

const PieChart: Component<Props> = (props) => {
    let canvas!: HTMLCanvasElement;
    let chart: Chart | undefined;

    createEffect(() => {
        chart?.destroy();

        chart = new Chart(canvas, {
            type: "pie",
            data: {
                labels: props.data.map(
                    r => `${r.category} (${r.currency})`
                ),
                datasets: [{
                    data: props.data.map(r => r.amount2 / 100),
                    backgroundColor: [
                        "#0d6efd",
                        "#198754",
                        "#dc3545",
                        "#ffc107",
                        "#6f42c1",
                        "#fd7e14",
                        "#20c997",
                        "#0dcaf0",
                        "#6c757d",
                        "#d63384",
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "right",
                    }
                }
            }
        });
    });

    onCleanup(() => chart?.destroy());

    return <canvas ref={canvas} />;
};

export default PieChart;