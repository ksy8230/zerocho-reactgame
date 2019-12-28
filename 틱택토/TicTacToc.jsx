import React, { useState, useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'o',
  tableData : [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', '']
  ],
  recentCell: [[-1],[-1]],
  nowinner : false,
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER :
      return {
        ...state,
        winner: action.winner,
        nowinner: false,
      };
    case CLICK_CELL : {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN : {
      return {
        ...state,
        turn : state.turn === 'o' ? 'x' : 'o',
      };
    }
    case RESET_GAME : {
      return {
        ...state,
        turn: 'o',
        tableData : [
          ['', '', ''], 
          ['', '', ''], 
          ['', '', '']
        ],
        recentCell: [[-1],[-1]],
      }
    }
    case NO_WINNER : {
      return {
        ...state,
        winner: '',
        tableData : [
          ['', '', ''], 
          ['', '', ''], 
          ['', '', '']
        ],
        recentCell: [[-1],[-1]],
        nowinner: true,
      }
    }
    default :
      return state;
  }
};

const TicTacToc = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { tableData, winner, turn, recentCell, nowinner } = state;
  const onClickTable = useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: 'o' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row <0) {
      return;
    }
    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    
    if (win) {
      // 승리검사
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type : RESET_GAME });

    } else {
      // 무승부 검사

      // alldl true면 무승부
      let all = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          // 하나라도 안 찬 칸이 있으면 무승부가 아님
          if(!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type : NO_WINNER });
        //dispatch({ type : RESET_GAME });
      } else {
        dispatch({ type : CHANGE_TURN });
      }
    }
    console.log(win, tableData, turn, '무승부', nowinner)
  }, [recentCell]);

  return (
    <> 
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner} 님의 승리</div>}
      {nowinner && <div>무승부입니다</div>}
    </>
  );
}

export default TicTacToc;