import { Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState,useMemo } from "react";
import PropTypes from "prop-types";
import categoryApi from "../../../api/categoryApi";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    listStyleType: "none",
    margin: "12px 0",
    padding: "0",

    "& > li": {
      margin: "0",
      padding: "8px",
    },
  },
});

function FilterViewer({ filters = {}, onChange = null, category }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  
  const FILTER_LIST = [
   {
     id: 1,
     getLabel: () => "Giao hàng miễn phí",
     isActive: (filters) => filters.isFreeShip,
     isVisible: () => true,
     isRemovable: false,
     onRemove: () => {},
     onToggle: (filters) => {
       const newFilters = { ...filters };

       if (newFilters.isFreeShip) {
         delete newFilters.isFreeShip;
       } else {
         newFilters.isFreeShip = true;
       }

       return newFilters;
     },
   },
   {
     id: 2,
     getLabel: () => "Có khuyến mãi",
     isActive: () => true,
     isVisible: (filters) => filters.isPromotion,
     isRemovable: () => true,
     onRemove: (filters) => {
       const newFilters = { ...filters };
       delete newFilters.isPromotion;
       return newFilters;
     },
     onToggle: null,
   },
   {
     id: 3,
     getLabel: (filters) =>
       `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
     isActive: () => true,
     isVisible: () =>
       Object.keys(filters).includes("salePrice_lte") &&
       Object.keys(filters).includes("salePrice_gte"),
     isRemovable: () => {},
     onRemove: () => {
       const newFilters = { ...filters };
       delete newFilters.salePrice_lte;
       delete newFilters.salePrice_gte;
       return newFilters;
     },
     onToggle: () => {},
   },
   {
     id: 4,
     getLabel: (filters) => {
       const idCategory = filters["category.id"] - 1;
       return categoryList[idCategory]?.name;
     },
     isActive: () => true,
     isVisible: (filters) => filters["category.id"],
     isRemovable: () => {},
     onRemove: () => {
       const newFilters = { ...filters };
       delete newFilters["category.id"];
       return newFilters;
     },
     onToggle: () => {},
   },
 ];

  const visibleFilters = useMemo(() => {
     return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])
  useEffect(() => {
    (async () => {
      // code goes here
      try {
        const list = await categoryApi.getAll();

        setCategoryList(
          list.data.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("Failed to fetch ", error);
      }
    })();
  }, []);



  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={!x.isRemovable}
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    console.log("New onDelete", newFilters);

                    onChange(newFilters);
                  }
                : null
            }
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    console.log("New filters", newFilters);
                    onChange(newFilters);
                  }
            }
          />
        </li>
      ))}
    </Box>
  );
}

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default FilterViewer;
