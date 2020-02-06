import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

type SearchProps = {
    title: string;
    onSearch: (arg0: string) => void;
    selectors: Array<string>;
};

const Search = ({ title, onSearch, selectors }: SearchProps) => {
    const [input, setInput] = useState(0);
    let active = selectors[0];
    function onClickSelector(select: string) {
        active = select;
    }
    return (
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">{title}</InputGroup.Text>
            </InputGroup.Prepend>
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={active}
                id="input-group-dropdown-1"
            >
                {selectors.map((select: string) => (
                    <Dropdown.Item key={select} onClick={onClickSelector(select)}>
                        {select}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <FormControl
                aria-describedby="basic-addon1"
                inputRef={ref => {
                    setInput(ref);
                }}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        onSearch();
                    }
                }}
            />
        </InputGroup>
    );
};
export default observer(Search);
