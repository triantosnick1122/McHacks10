import { Component, createEffect, createSignal, onMount } from "solid-js";
import NavMenu from "../components/NavManu";
import { Spinner } from "solid-bootstrap";
import "./styles/Leaderboard.scss";
import { Table, Tbody, Td, Th, Thead, Tr, useColorMode } from "@hope-ui/solid";

const [data1, setData1] = createSignal<any>(undefined);

const BASE_URL = "http://toxicity-analyzer-app.canadacentral.cloudapp.azure.com:8000/scoreboard";

const Spin: Component = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return <div class="center spin-div"><Spinner class="spin" animation="border" variant={colorMode() === "light"? "dark": "light"} role="status"/></div>;
}

const makeRequest = () => {
    fetch(BASE_URL, {method: "GET"})
    .then(resp => resp.json())
    .then(d => setData1(d));
}

const Board: Component = () => {
    makeRequest();

    createEffect(() => console.log(data1()))

    return (
        data1() === undefined? <Spin/>:
        <Table striped="odd">
            <Thead>
                <Tr>
                    <Th>Thread</Th>
                    <Th numeric>Score</Th>
                    <Th numeric>Posts Analyzed</Th>
                    <Th>Date Calculated</Th>
                </Tr>
            </Thead>
            <Tbody>
            {
                data1().board.forEach((e: any) => (
                    <Tr>
                        <Td>{e.subreddit}</Td>
                        <Td>{e.score}</Td>
                        <Td>{e.records_analyzed}</Td>
                        <Td>{e.timestamp}</Td>
                    </Tr>
                ))
            }
            </Tbody>
        </Table>
    );
};

const LeaderBoard: Component = () => {
    return (
        <>
            <NavMenu/>
            <Board/>
        </>
    );
}

export default LeaderBoard;
