import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

/**
 * ESAutosuggest is a composition with Reach Autosuggest (RA), 
 * which is a WAI-ARIA compliant autosuggest component built in React.
 * This component allows the user to connect RA with Elasticsearch
 * to provide real-time suggestions to the user. 
 */
export default class Autocomplete extends Component {

  constructor(props) {
        super(props);
        this.state = {value: '', suggestions: []}
        this.propsToState = this.propsToState.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }

  propsToState(newProps) {
      this.setState({value: newProps.value, suggestions: newProps.suggestions});
  }

  componentWillReceiveProps(newProps) {
      this.propsToState(newProps);
  }

  componentWillMount() {
      this.propsToState(this.props);
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
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

//TODO: Make this more general so it can handle arbitrary returned data (multiple keys)
  renderSuggestion(suggestion){
    return (suggestion[this.props.defaultField])
  }

  onChange(event, { newValue }) {
    this.setState({ value: newValue })
    this.props.setProps({ value: newValue })
  }

/* 
* This contains the logic for how suggestions should be generated. In this case, it's ElasticSearch (via axios).
*/
  onSuggestionsFetchRequested({ value }){
    const config = { auth: {username: this.props.authUser, password: this.props.authPass},};
    
    searchterm = ''
    if (value.includes(", ")) {
      var searchterm = value.substring(value.lastIndexOf(", ") + 2, value.length);
    } else {
      var searchterm = value; 
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
        sort: this.props.sort
      }, config)
      .then(res => {
        const results = res.data.hits.hits.map(h => h._source)
        this.setState({ suggestions: results })
      })
    // const results = [{'original': 'subtasks', 'normalized': 'subtasks'}, {'original': 'microinclusions', 'normalized': 'microinclusions'}, {'original': 'solutions', 'normalized': 'solutions'}, {'original': 'layer interfaces', 'normalized': 'layer interface'}, {'original': 'elastic fibers', 'normalized': 'elastic fibers'}, {'original': 'multi-layer structure', 'normalized': 'multi-layer structure'}, {'original': 'nano porous', 'normalized': 'nanoporous'}, {'original': 'nano-channels', 'normalized': 'nano-channels'}, {'original': 'nanopaper', 'normalized': 'nanopaper'}, {'original': 'co-polymers', 'normalized': 'co-polymers'}, {'original': 'single - cell', 'normalized': 'single - cell'}, {'original': 'intercalates', 'normalized': 'intercalated'}, {'original': 'subsurface waters', 'normalized': 'subsurface waters'}, {'original': 'superplastic alloys', 'normalized': 'superplastic alloys'}, {'original': 'eucalypt', 'normalized': 'eucalyptus'}, {'original': 'intracrystalline', 'normalized': 'intracrystalline'}, {'original': 'porous layers', 'normalized': 'porous layer'}, {'original': 'colonies', 'normalized': 'colonies'}, {'original': 'single nanocrystals', 'normalized': 'single nanocrystals'}, {'original': 'foam surface', 'normalized': 'foam surface'}, {'original': 'pure ceramic', 'normalized': 'pure ceramic'}, {'original': 'templates', 'normalized': 'templates'}, {'original': 'thin - sheet', 'normalized': 'thin sheets'}, {'original': 'solid particles', 'normalized': 'solid particles'}, {'original': 'trialkoxysilanes', 'normalized': 'trialkoxysilanes'}, {'original': 'thin composite', 'normalized': 'thin composite'}, {'original': '2-D arrays', 'normalized': '2-D arrays'}, {'original': 'single buyer', 'normalized': 'single buyer'}, {'original': 'waterborne', 'normalized': 'waterborne'}, {'original': 'nanoaggregates', 'normalized': 'nanoaggregates'}, {'original': 'nano-dots', 'normalized': 'nano-dots'}, {'original': 'boiler', 'normalized': 'boilers'}, {'original': 'templated', 'normalized': 'templates'}, {'original': 'polypropylene composites', 'normalized': 'polypropylene composites'}, {'original': 'mono-layered', 'normalized': 'monolayer'}, {'original': 'claystones', 'normalized': 'claystone'}, {'original': 'composite - coated', 'normalized': 'composite - coated'}, {'original': 'multiphase composite', 'normalized': 'multiphase composites'}, {'original': 'subgroups', 'normalized': 'subgroup'}, {'original': 'plane arrays', 'normalized': 'plane arrays'}, {'original': 'therapeutics', 'normalized': 'therapeutics'}, {'original': 'subspectrum', 'normalized': 'subspectrum'}, {'original': 'as-spun fibres', 'normalized': 'as-spun fibres'}, {'original': 'ventricles', 'normalized': 'ventricles'}, {'original': 'water cluster', 'normalized': 'water clusters'}]
    // this.setState({ suggestions: results })
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] })
  }

  getSuggestionValue(suggestion) {
    if (this.state.value.includes(", ")) {
      var prefix = this.state.value.substring(0, this.state.value.lastIndexOf(", ") + 2);
    } else {
      var prefix = ""
    }
    return (prefix + suggestion[this.props.defaultField])
  }
  
  render() {
    const {suggestions, value} = this.state
    const {
      id, 
      endpoint, 
      fields, 
      sort, 
      placeholder, 
      defaultField,
      setProps, 
      debounce,
    } = this.props;

    const inputProps = {
        placeholder: placeholder,
        value, 
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        autoComplete: "off"
    }

    return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onKeyPress={this.onKeyPress}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
    )
  }
}

Autocomplete.defaultProps = {    
  n_submit: 0,
  n_submit_timestamp: -1,
  sort: ['_score'],
  suggestions: [],
  endpoint: "http://localhost:9200" // Default for ElasticSearch
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
};