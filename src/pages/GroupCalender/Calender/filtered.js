import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { Grid } from "@mui/material";
import ModalDelete from "./modal_fix_delete_categori";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredEvents, setMenuFilter } from "redux/actions/index";
import axios from 'axios';


const Filtered = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const dispatch = useDispatch();
    const events = useSelector((state) => state.calendarReducer.events);

    const filterItem = (curcat) => {
        const newItem = events.filter((newVal) => {
            return newVal.filter === curcat;
        });
        dispatch(setFilteredEvents(newItem));
    };

    const handleCheckboxChange = (Val) => {
        if (selectedItem === Val) {
            setSelectedItem(null);
        } else {
            setSelectedItem(Val);
            filterItem(Val);
        }
    };

    const isItemSelected = (Val) => {
        return selectedItem === Val;
    };

    const menuFilter = useSelector((state) => state.calendarReducer.menuFilter)

    useEffect(() => {
        const userDataJSON = localStorage.getItem('Calender');
        const userData = JSON.parse(userDataJSON);
        const id = userData.id;
        const payload = {
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'filter',
            appid: '6492ab85e1bb12965b3ee12a',
            where_field: 'user_id',
            where_value: id
        };
        const url = `https://io.etter.cloud/v4/select_where/token/6462d14bbd4ed7ca344ffbc3/project/calender/collection/filter/appid/6492ab85e1bb12965b3ee12a/where_field/user_id/where_value/${id}`;

        axios.get(url, payload)
            .then((response) => {
                dispatch(setMenuFilter(response.data))
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div>
            <Grid>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <Checkbox
                        checked={isItemSelected('Uncategorized')}
                        onChange={() => handleCheckboxChange('Uncategorized')}
                    />
                    <span>Uncategorized</span>
                </div>
                {menuFilter.map((menu) => {
                    return (
                        <label key={menu._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <Checkbox
                                    checked={isItemSelected(menu.name_filter)}
                                    onChange={() => handleCheckboxChange(menu.name_filter)}
                                />
                                <span>{menu.name_filter}</span>
                            </div>
                            <div>
                                <ModalDelete
                                    Val={menu.name_filter}
                                />
                            </div>
                        </label>
                    );
                })}
            </Grid>
        </div>
    );
};


export default Filtered;
