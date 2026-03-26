import { useState } from 'react';

export const useProductSelection = () => {
    const [selected, setSelected] = useState<readonly number[]>([]);

    const handleSelectAllClick = (data: { id: number }[], checked: boolean) => {
        if (checked) {
            setSelected(data.map((n) => n.id));
            return;
        }
        setSelected([]);
    };

    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const clearSelection = () => setSelected([]);

    return {
        selected,
        handleSelectAllClick,
        handleClick,
        clearSelection
    };
};