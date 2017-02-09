import {BigTableRow} from "./BigTable";
import {NumberMap} from "../../utils";
const COLS_COUNT = 1;
const ROW_PER_LEVEL_COUNT = 1;


export const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id'
}];

const colNames: NumberMap<string> = {};

const getColName = (i: number) => {
    if (!colNames[i]) {
        colNames[i] = "column_" + i
    }
    return colNames[i];
};

for (let i = 0; i < COLS_COUNT; i++) {
    columns.push({
        title: getColName(i),
        dataIndex: getColName(i),
        key: getColName(i)
    })
}

let id = 1;
function generateRows(res: Array<BigTableRow> = [], level = 1) {
    const rowsCnt = ROW_PER_LEVEL_COUNT / (Math.pow(10, level - 1));
    if (rowsCnt < 2) {
        return;
    }
    for (let i = 0; i < rowsCnt; i++) {
        const row = generateRow(id++);
        generateRows(row.children, level + 1);
        res.push(row);
    }
    return res;
}

function generateRow(id: number): BigTableRow {
    const res: BigTableRow = {id: id.toString(), children: [], key: id.toString()};
    for (let i = 0; i < COLS_COUNT; i++) {
        res[getColName(i)] = "cell " + id + " " + i;
    }
    return res;
}

export const rows = generateRows();