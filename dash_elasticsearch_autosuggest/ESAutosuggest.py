# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ESAutosuggest(Component):
    """An ESAutosuggest component.
ESAutosuggest is a composition with Reach Autosuggest (RA),
which is a WAI-ARIA compliant autosuggest component built in React.
This component allows the user to connect RA with Elasticsearch
to provide real-time suggestions to the user.

Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks
- value (string; default ""): The value displayed in the input
- endpoint (string; default "http://localhost:9200/_search"): The ElasticSearch endpoint
- fields (list; optional): The ElasticSearch fields to search on (e.g. ['fullName', 'shortCode'])
- defaultField (string; default "autocomplete"): The default field which contains the value that should be autocompleted
- additionalField (string; optional): Additional field which should be displayed next to autocompleted value
- multiSection (boolean; optional): Display single section or multiple sections of results
- sectionMap (dict; optional): Object that maps index name to section header
- lastValueMeta (dict; optional): Metadata about the value(s) in the box.
- sort (list; default ['_score']): How ElasticSearch should sort the results (e.g. ['_score', { createdDate: 'desc' }])
- placeholder (string; optional): Placeholder string
- suggestions (list; optional): Placeholder string
- numSuggestions (number; optional): Number of suggestions to display
- n_submit (number; default 0): Number of times the `Enter` key was pressed while the input had focus.
- n_submit_timestamp (number; default -1): Last time that `Enter` was pressed.
- authUser (string; optional): Username for Elasticsearch.
- authPass (string; optional): Password for Elasticsearch.
- searchField (string; default "autocomplete"): Field which query endpoint is matching against (e.g. "name.edgengram")
- autoFocus (boolean; default False): Whether the cursor should automatically be set inside this component. Default is false.
- spellCheck (a value equal to: 'true', 'false' | boolean; optional): Setting the value of this attribute to true indicates that the element needs to have its spelling and grammar checked.
The value default indicates that the element is to act according to a default behavior, possibly based on the parent
element's own spellcheck value. The value false indicates that the element should not be checked.
- style (dict; optional): The input's inline styles
- sectionOrder (list; optional): Permanent ordering of sections/indexes in the results.
- debounceDelay (number; default 100): Debounce delay in milliseconds."""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, value=Component.UNDEFINED, endpoint=Component.UNDEFINED, fields=Component.UNDEFINED, defaultField=Component.UNDEFINED, additionalField=Component.UNDEFINED, multiSection=Component.UNDEFINED, sectionMap=Component.UNDEFINED, lastValueMeta=Component.UNDEFINED, sort=Component.UNDEFINED, placeholder=Component.UNDEFINED, suggestions=Component.UNDEFINED, numSuggestions=Component.UNDEFINED, n_submit=Component.UNDEFINED, n_submit_timestamp=Component.UNDEFINED, authUser=Component.UNDEFINED, authPass=Component.UNDEFINED, searchField=Component.UNDEFINED, autoFocus=Component.UNDEFINED, spellCheck=Component.UNDEFINED, style=Component.UNDEFINED, sectionOrder=Component.UNDEFINED, debounceDelay=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'value', 'endpoint', 'fields', 'defaultField', 'additionalField', 'multiSection', 'sectionMap', 'lastValueMeta', 'sort', 'placeholder', 'suggestions', 'numSuggestions', 'n_submit', 'n_submit_timestamp', 'authUser', 'authPass', 'searchField', 'autoFocus', 'spellCheck', 'style', 'sectionOrder', 'debounceDelay']
        self._type = 'ESAutosuggest'
        self._namespace = 'dash_elasticsearch_autosuggest'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'value', 'endpoint', 'fields', 'defaultField', 'additionalField', 'multiSection', 'sectionMap', 'lastValueMeta', 'sort', 'placeholder', 'suggestions', 'numSuggestions', 'n_submit', 'n_submit_timestamp', 'authUser', 'authPass', 'searchField', 'autoFocus', 'spellCheck', 'style', 'sectionOrder', 'debounceDelay']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(ESAutosuggest, self).__init__(**args)
