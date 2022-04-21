import React, { CSSProperties, useRef } from 'react';
import styles from './Table.module.scss';

type PropsType = {
  theadWidth: number[];
  theadData: string[];
  tbodyData: any;
  emptyTable: {
    text: string;
    style: React.CSSProperties;
  };
  tableStyle?: React.CSSProperties;
  tbodyStyle?: React.CSSProperties;
};

const Table = (props: PropsType) => {
  const { theadData, theadWidth, tbodyData, emptyTable, tableStyle, tbodyStyle } = props;
  const tbody = useRef<any>();

  const renderThead = () => {
    return theadData.map((data, i) => {
      let returnTh = null;

      if (typeof data === 'string') {
        returnTh = (
          <th key={i} width={`${theadWidth[i]}%`}>
            {data}
          </th>
        );
      }
      return returnTh;
    });
  };

  return (
    <table className={styles.table_scroll_style} style={tableStyle || {}}>
      <thead>
        <tr>{renderThead()}</tr>
      </thead>
      <tbody ref={tbody} style={tbodyStyle}>
        {(!!tbodyData && tbodyData.length > 0) || !emptyTable ? (
          tbodyData
        ) : (
          <tr>
            <td colSpan={'100%'} style={emptyTable.style || {}}>
              {emptyTable.text}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
