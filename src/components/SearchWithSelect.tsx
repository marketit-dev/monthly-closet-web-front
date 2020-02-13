import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { ParsedUrlQueryInput } from 'querystring';

type SearchProps = {
    title: string;
    onSearch: (arg0: ParsedUrlQueryInput) => void;
    searchTypes: Array<string>;
    searchTypeKeys: Array<string>;
};

const Search = ({ title, onSearch, searchTypes, searchTypeKeys }: SearchProps) => {
    const [searchForm, setSearchForm] = useState<string>('');
    const [active, setActive] = useState<number>(0);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        console.log(value);
        setSearchForm(value);
        console.log(searchForm);
    };

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        onSearch({ [searchTypeKeys[active]]: searchForm });
        setSearchForm(''); // 초기화
    };

    const handleKeyPressSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log('event', event.keyCode);
        if (event.keyCode === 13) {
            event.preventDefault();
            onSearch({ [searchTypeKeys[active]]: searchForm });
            setSearchForm(''); // 초기화
        }
    };

    function onClickSelector(index: number) {
        setActive(index);
    }
    return (
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">{title}</InputGroup.Text>
            </InputGroup.Prepend>
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={searchTypes[active]}
                id="input-group-dropdown-1"
            >
                {Object.keys(searchTypes).map((select: string, index: number) => (
                    <Dropdown.Item key={select} onClick={() => onClickSelector(index)}>
                        {searchTypes[index]}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <FormControl
                aria-describedby="basic-addon1"
                onChange={onChange}
                onKeyUp={handleKeyPressSubmit}
                onSubmit={handleSubmit}
            />
        </InputGroup>
    );
};
export default observer(Search);
