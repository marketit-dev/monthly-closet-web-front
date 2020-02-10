import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

type SearchProps = {
    title: string;
    onSearch: (arg0: string, arg1: string) => void;
    selectors: Array<string>;
};

const Search = ({ title, onSearch, selectors }: SearchProps) => {
    const [searchForm, setSearchForm] = useState<string>('');

    let active = selectors[0];
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchForm(value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        onSearch(searchForm, active);
        setSearchForm(''); // 초기화
    };

    const handleKeyPressSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            onSearch(searchForm, active);
            setSearchForm(''); // 초기화
        }
    };

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
                    <Dropdown.Item key={select} onClick={() => onClickSelector(select)}>
                        {select}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <FormControl
                aria-describedby="basic-addon1"
                onChange={onChange}
                onKeyPress={handleKeyPressSubmit}
                onSubmit={handleSubmit}
            />
        </InputGroup>
    );
};
export default observer(Search);
