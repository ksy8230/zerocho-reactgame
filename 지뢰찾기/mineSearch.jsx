import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, //  0이상이면 다 오픈
}

// 1. createContext 만들기 / 전달 초기값 설정
export const TableContext = createContext({
  tableData : [
  ],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData : [],
  timer : 0,
  result:'',
  halted: false,
};

const plantMine = (row, cell, mine) => {
  console.log(row,cell,mine)
  const candidate = Array(row*cell).fill().map((arr,i)=>{ return i });
  // EX. shuffle: 1~100숫자중 랜덤으로 mine 수만큼 뽑은 정렬 
  const shuffle = [];
  while(candidate.length > row*cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  // row * cell 표만들기
  for ( let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // shuffle 배열의 수를 표에 심기(지뢰 심기)
  for (let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k]/cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data)
  return data;

};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME : 
      return {
        ...state,
        tableData : plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      //tableData[action.row][action.cell] = CODE.OPENED;
      // 클릭했을 때 내 주변 검사
      // 클릭했을 때 내 주변 8칸, 혹은 가장자리에 있는 경우 5칸 검사
      let around = [];
      if (tableData[action.row - 1]){
        around = around.concat(
          tableData[action.row - 1][action.cell - 1],
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1],
        );
      }
      around = around.concat(
        tableData[action.row][action.cell - 1],
        tableData[action.row][action.cell + 1],
      )
      if (tableData[action.row + 1]){
        around = around.concat(
          tableData[action.row + 1][action.cell - 1],
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1],
        )
      }
      const count = around.filter(function (v) {
        return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
      }).length;
      console.log(count)
      tableData[action.row][action.cell] = count;

      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE :{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      }else{
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    default : 
      return state;
  }
};

const MineSearch = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const {tableData, halted, timer, result } = state;
  // Context를 사용하고 있는 컴포넌트가 리랜더링될 때마다 그 값을 사용하고 있는
  // 하위컴포넌트들도 불필요하게 리랜더링되기 때문에 
  // 해당 값을 useMemo로 연결하여 기억하게 만들어준다 (최적화)
  const value = useMemo(() => ({ tableData: tableData, halted:halted, dispatch }), [tableData, halted]);
  return (
    // 2. Provider로 감싸주기 / value: 하위컴포넌트에 바로 전달하고 싶은 값들
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
}

export default MineSearch;