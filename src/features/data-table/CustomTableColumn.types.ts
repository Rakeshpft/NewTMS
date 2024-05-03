interface CustomTableColumn{
    id:string,
    name:string,
    headCell?:any,
    style?:{'width'?:string, 'font-size'?:string, 'font-weight'?:string },
    selector:any,
    format?:any,
    cell?:any,
    sortable?:boolean,
    align?:'left'|'right'|'center'
    footCell?:any,
}