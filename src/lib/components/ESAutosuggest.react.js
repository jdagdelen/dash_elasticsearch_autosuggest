import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import {debounce} from 'throttle-debounce'

function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;
    return str.replace(/%s/g, () => args[i++]);
}

function getSectionSuggestions(section) {
    return section.suggestions;
}

function dictToList(categories) {
    // console.log("categories")
    // console.log(categories)
    var sections = [];
    for (var key in categories) {
        if (categories.hasOwnProperty(key)) {
            sections.push({"title": key, "suggestions": categories[key]});
        }
    }

    return sections
}

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

/**
 * ESAutosuggest is a composition with Reach Autosuggest (RA),
 * which is a WAI-ARIA compliant autosuggest component built in React.
 * This component allows the user to connect RA with Elasticsearch
 * to provide real-time suggestions to the user.
 */
export default class Autocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', suggestions: []};
        this.setState({value: '', suggestions: []});
        this.propsToState = this.propsToState.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.renderSectionTitle = this.renderSectionTitle.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
    }

    propsToState(newProps) {
        this.setState({
            value: newProps.value !== null ? newProps.value : '',
            suggestions: newProps.suggestions
        });
    }

    componentWillReceiveProps(newProps) {
        this.propsToState(newProps);
    }

    componentWillMount() {
        this.propsToState(this.props);
        this.onSuggestionsFetchRequested = debounce(
            0,
            this.onSuggestionsFetchRequested
        )
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            const payload = {
                n_submit: this.props.n_submit + 1,
                n_submit_timestamp: Date.now(),
                value: this.state.value,
            };
            this.props.setProps(payload);
        }
    }

    onSuggestionSelected(event, {suggestion, suggestionValue, method}) {
        if (method === 'enter' || method === 'click') {
            const payload = {
                value: suggestionValue,
                lastValueMeta: suggestion
            };
            this.props.setProps(payload);
        }
    }

// TODO: Make this more general so it can handle arbitrary returned data (multiple keys)
    renderSuggestion(suggestion) {
        const source = suggestion._source;
        if (this.props.additionalField === null) {
            return (source[this.props.defaultField])
        }
        const entity = source[this.props.defaultField];
        const normalized = source[this.props.additionalField];
        if (entity !== normalized) {
            return (<span>{parse("%s [%s]", entity, normalized)}</span>)
        }
        return (<span>{parse("%s", entity)}</span>)
    }

    renderSectionTitle(section) {
        var title = section.title;
        if (this.props.sectionMap !== null && section.title in this.props.sectionMap) {
            title = this.props.sectionMap[section.title];
        }
        return (
            <strong>{title}</strong>
        );
    }

    onChange(event, {newValue}) {
        this.setState({value: newValue});
    }

    /*
    * This contains the logic for how suggestions should be generated. In this case, it's ElasticSearch (via axios).
    */
    onSuggestionsFetchRequested({value}) {
        const config = {auth: {username: this.props.authUser, password: this.props.authPass},};

        let searchterm = '';
        if (value.includes(", ")) {
            searchterm = value.substring(value.lastIndexOf(", ") + 2, value.length);
        } else {
            searchterm = value;
        }
        axios
            .post(this.props.endpoint, {
                query: {
                    match: {
                        [this.props.searchField]: searchterm,
                    }
                    // multi_match: {
                    //   query: value,
                    //   fields: this.props.fields
                    // }
                },
                sort: this.props.sort,
                size: this.props.numSuggestions
            }, config)
            .then(res => {
                // const results = res.data.hits.hits.map(h => h._source);
                const results = res.data.hits.hits;
                console.log(dictToList(groupBy(results, '_index')))
                // this.setState({suggestions: [{"title": "Properties", "suggestions": results}]})
                if (Array.isArray(results) && results.length > 0) {
                    const suggestions = dictToList(groupBy(results, '_index'));
                    this.setState({suggestions: suggestions})
                }
            })
    }

    onSuggestionsClearRequested() {
        this.setState({suggestions: []})
    }

    getSuggestionValue(suggestion) {
        const source = suggestion._source;
        let prefix = "";
        if (this.state.value.includes(", ")) {
            prefix = this.state.value.substring(0, this.state.value.lastIndexOf(", ") + 2);
        } else {
            prefix = "";
        }
        // this.props.setProps({lastValueMeta: suggestion});
        return (prefix + source[this.props.defaultField])
    }

    render() {
        const {suggestions, value} = this.state;
        const {
            placeholder,
            autoFocus,
            style,
            spellCheck,
        } = this.props;

        const inputProps = {
            placeholder: placeholder,
            value,
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
            onSuggestionSelected: this.onSuggestionSelected,
            autoComplete: "off",
            autoFocus: autoFocus,
            style: style,
            spellCheck: spellCheck
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                value={value}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onKeyPress={this.onKeyPress}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                multiSection={true}
                renderSectionTitle={this.renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
            />
        )
    }
}

Autocomplete.defaultProps = {
    value: "",
    n_submit: 0,
    n_submit_timestamp: -1,
    sort: ['_score'],
    suggestions: [],
    endpoint: "http://localhost:9200", // Default for ElasticSearch
    autoFocus: false,
    lastValueMeta: null
};

Autocomplete.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * The value displayed in the input
     */
    value: PropTypes.string,

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func,

    /**
     * The ElasticSearch endpoint
     */
    endpoint: PropTypes.string,

    /**
     * The ElasticSearch fields to search on (e.g. ['fullName', 'shortCode'])
     */
    fields: PropTypes.array,

    /**
     * The default field which contains the value that should be autocompleted
     */
    defaultField: PropTypes.string,

    /**
     * Additional field which should be displayed next to autocompleted value
     */
    additionalField: PropTypes.string,

    /**
     * Display single section or multiple sections of results
     */
    multiSection: PropTypes.bool,

    /**
     * Object that maps index name to section header
     */
    sectionMap: PropTypes.object,

    /**
     * Metadata about the value(s) in the box.
     */
    lastValueMeta: PropTypes.object,

    /**
     * How ElasticSearch should sort the results (e.g. ['_score', { createdDate: 'desc' }])
     */
    sort: PropTypes.array,

    /**
     * Placeholder string
     */
    placeholder: PropTypes.string,

    /**
     * Placeholder string
     */
    suggestions: PropTypes.array,

    /**
     * Number of suggestions to display
     */
    numSuggestions: PropTypes.number,

    /**
     * Number of times the `Enter` key was pressed while the input had focus.
     */
    n_submit: PropTypes.number,
    /**
     * Last time that `Enter` was pressed.
     */
    n_submit_timestamp: PropTypes.number,
    /**
     * Username for Elasticsearch.
     */
    authUser: PropTypes.string,
    /**
     * Password for Elasticsearch.
     */
    authPass: PropTypes.string,

    /**
     * Field which query endpoint is matching against (e.g. "name.edgengram")
     */
    searchField: PropTypes.string,

    /**
     * Whether the cursor should automatically be set inside this component. Default is false.
     */
    autoFocus: PropTypes.bool,

    /**
     * Setting the value of this attribute to true indicates that the element needs to have its spelling and grammar checked.
     * The value default indicates that the element is to act according to a default behavior, possibly based on the parent
     * element's own spellcheck value. The value false indicates that the element should not be checked.
     */
    spellCheck: PropTypes.oneOfType([
        // enumerated property, not a boolean property: https://www.w3.org/TR/html51/editing.html#spelling-and-grammar-checking
        PropTypes.oneOf(['true', 'false']),
        PropTypes.bool,
    ]),

    /**
     * The input's inline styles
     */
    style: PropTypes.object,
};