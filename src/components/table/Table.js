import {forwardRef, useEffect, useLayoutEffect, useState} from 'react';
import React from "react";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";
import {getCompaniesBySymbol, getCompanyBySymbol} from "../../api/services/Company";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function CompanyTable() {

    const [columns, setColumns] = React.useState({
        columns: [
            { title: 'Name', field: 'Name'},
            { title: 'Description', field: 'Description'},
            { title: 'Address', field: 'Address'},
            { title: 'Dividend Yield', field: 'DividendYield'},
            { title: 'Market Capitalization', field: 'MarketCapitalization'},

        ],
    });


    const [companyData, setCompanyData] = React.useState([]);
    const [symbol, setSymbol] = React.useState(['IBM', 'AAPL', 'MSFT']);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(companyData);

    const [companyName,setCompanyName] = useState('all');
    const [companyProps,setCompanyProps] = useState('all');
    const [companyPropsOperator, setCompanyPropsOperator] = useState('>');

    useEffect(() => {
        setFilteredData(companyName==='all'?companyData:companyData.filter(companyData => companyData.Name === companyName));
    }, [companyName]);



    useEffect(() => {
        switch (companyPropsOperator) {
            case '>':
                return;
            case '<':
                return;
        }
    }, [companyProps, companyPropsOperator]);


    useEffect( () => {
        setIsLoading(true);
        getCompaniesBySymbol(symbol)
            .then(result => {
                setCompanyData(result);
                setIsLoading(false);
            })
    }, []);

    return (
        <div>
        <MaterialTable
            options={{
                pageSize: 10,
                pageSizeOptions: [5, 10, 25],
                emptyRowsWhenPaging: false,
                addRowPosition: 'first',
            }}
            title="Companies"
            columns={columns.columns}
            data={filteredData}
            icons={tableIcons}
            isLoading={isLoading}
            actions={[
                {
                    icon:()=><Select
                        labelId="select company"
                        id="selectCompany"
                        style={{width:100}}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    >
                        <MenuItem value={"all"}><em>All</em></MenuItem>
                        <MenuItem value={'International Business Machines Corporation'}>IBM</MenuItem>
                        <MenuItem value={'Microsoft Corporation'}>Microsoft</MenuItem>
                        <MenuItem value={'Apple Inc'}>Apple</MenuItem>
                    </Select>,
                    tooltip:"Filter Company",
                    isFreeAction:true
                },

            ]}

        />
        </div>
    );
}

