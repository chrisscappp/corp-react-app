import { memo } from "react"
import { TasksSortViewType, DevsSortViewType, SortPropType } from "models"
import SelectComponent from "../SelectComponent/SelectComponent"
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'

interface SortSelectorProps {
    sortProp: SortPropType;
    viewItems: TasksSortViewType[] | DevsSortViewType[];
    sortTasks: (key: string) => void;
}

const SortSelector = ({ sortProp, viewItems, sortTasks }: SortSelectorProps) => {

    return (
        <>
            <Container fixed>
                <SelectComponent selectProp = {sortProp}>
                    {
                        viewItems.map((item) => {
                            return (
                                <MenuItem 
                                    key = {item.key} 
                                    value = {item.key} 
                                    onClick = {() => sortTasks(item.key)}
                                >
                                    {item.title}
                                </MenuItem>
                            )
                        })
                    }
                </SelectComponent>
            </Container>
        </>
    )
}

export default memo(SortSelector)