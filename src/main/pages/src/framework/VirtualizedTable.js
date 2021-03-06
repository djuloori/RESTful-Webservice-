import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Link } from 'react-router-dom';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const styles = theme => ({
    table: {
        fontFamily: theme.typography.fontFamily,
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        outline: 'none',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
    gridStyle: {
        outline: 'none',
    }
});

class MuiVirtualizedTable extends React.PureComponent {
    getRowClassName = ({ index }) => {
        const { classes, rowClassName, onRowClick } = this.props;

        return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRendererViewLink = ({ cellData, columnIndex = null }) => {
        const { rowHeight, rowFontSize, rowFontWeight, columns, classes, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight, fontSize: rowFontSize, fontWeight: rowFontWeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >

                <Link to={{ pathname: '/ViewDoc', state: { data: cellData } }} > View </Link>
            </TableCell>
        );
    };

    cellRenderer = ({ cellData, columnIndex = null }) => {
        const { rowHeight, rowFontSize, rowFontWeight, columns, classes, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight, fontSize: rowFontSize, fontWeight: rowFontWeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
        const { headerHeight, headerFontSize, headerFontWeight, columns, classes, sort } = this.props;
        const direction = {
            [SortDirection.ASC]: 'asc',
            [SortDirection.DESC]: 'desc',
        };

        const inner =
            !columns[columnIndex].disableSort && sort != null ? (
                <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
                    {label}
                </TableSortLabel>
            ) : (
                label
            );

        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight, fontSize: headerFontSize, fontWeight: headerFontWeight  }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                {inner}
            </TableCell>
        );
    };

    render() {
        const { classes, columns, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        className={classes.table}
                        gridClassName={classes.gridStyle}
                        height={height}
                        width={width}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
                            let renderer;
                            if (cellContentRenderer != null) {
                                renderer = cellRendererProps =>
                                    this.cellRenderer({
                                        cellData: cellContentRenderer(cellRendererProps),
                                        columnIndex: index,
                                    });
                            } else if ((dataKey === 'syllabus') || (dataKey === 'assignment')) {
                                renderer = this.cellRendererViewLink;
                            } else {
                                renderer = this.cellRenderer;
                            }

                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={headerProps =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classNames(classes.flexContainer, className)}
                                    cellRenderer={renderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}

                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            cellContentRenderer: PropTypes.func,
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    headerFontSize: PropTypes.number,
    headerFontWeight: PropTypes.string,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    rowFontSize: PropTypes.number,
    rowFontWeight: PropTypes.string,
    sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
    headerHeight: 56,
    headerFontSize: 16,
    headerFontWeight: 'bold',
    rowHeight: 56,
    rowFontSize: 14,
    rowFontWeight: 'normal',
};

export default withStyles(styles)(MuiVirtualizedTable);