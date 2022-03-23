import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoryApi from "../../../../api/categoryApi";
import { makeStyles } from "@mui/styles";
import SkeletonFilters from "../SkeletonFilters";

const useStyles = makeStyles({
  root: {
    padding: "12px",
  },
  listItem: {
    listStyle: "none",
    paddingBottom: "8px",

    "&:hover": {
      color: "rgba(0,0,0,0.5)",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  },
  list: {
    padding: "8px",
  },
});

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);

      } catch (error) {
        console.log("Failed to fetch ", error);
      }
    })();
  }, []);

  const handleClickCategory = (category) => {
    if (onChange) onChange(category.id);
  };

  // console.log(categoryList);
  return (
    <div>
      {loading ? (
        <SkeletonFilters lenght={6} />
      ) : (
        <ul className={classes.list}>
          {categoryList.map((category) => (
            <li
              key={category.id}
              onClick={() => handleClickCategory(category)}
              className={classes.listItem}
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

FilterByCategory.propTypes = {};

export default FilterByCategory;
