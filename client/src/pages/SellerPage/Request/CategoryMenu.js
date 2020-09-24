import React from 'react'
import { List, ListItem, ListItemText,makeStyles } from '@material-ui/core';

const useStyle = makeStyles(()=>({
    ul : {
        listStyle : 'none',
        textAlign : 'center',
        padding : '0px',
        margin : '0px',
        userSelect : 'none',
    },
    li : {
        padding : '15px 0px',
        margin : '0px',
        '&:hover': {
            backgroundColor: '#DADDDD',
            cursor: 'pointer',
        },
        '&:active': {
            backgroundColor: '#E5E5E5',
        }
    }
}))

const CategoryMenu = ({setCategory,setPage}) => {
    
    const classes = useStyle();

    const categories = [
        {
            category : '모든 요청'
        },
        {
            category : '웹 개발'
        },
        {
            category : '앱 개발'
        },
        {
            category : '소프트웨어 개발'
        },
        {
            category : '유지보수'
        },
    ]

    const onClickCategory = (value) => {
        setCategory(value);
        setPage(1);
    }

    // const categoryList = categories.map((obj,index)=>{
    //     return(
    //         <ListItem key={index} button onClick={() => { onClickCategory(obj.category) }}>
    //             <ListItemText primary={obj.category} />
    //         </ListItem>
    //     )
    // })

    const categoryList = categories.map((obj,index)=>{
        return(
            <li className={classes.li} key={index} onClick={() => { onClickCategory(obj.category) }}>
                {obj.category}
            </li>
        )
    })

    return (
        <ul className={classes.ul}>
            {categoryList}
        </ul>
    )

    // return (
    //     <List style={{marginTop : '40px', backgroundColor : 'skyblue'}}>
    //         {categoryList}
    //     </List>
    // )
}

export default CategoryMenu;
