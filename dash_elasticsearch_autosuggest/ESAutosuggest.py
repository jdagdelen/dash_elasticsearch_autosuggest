# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ESAutosuggest(Component):
    """A ESAutosuggest component.
ESAutosuggest is a composition with Reach Autosuggest (RA), 
which is a WAI-ARIA compliant autosuggest component built in React.
This component allows the user to connect RA with Elasticsearch
to provide real-time suggestions to the user.

Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks
- value (string; optional): The value displayed in the input
- endpoint (string; optional): The ElasticSearch endpoint
- fields (list; optional): The ElasticSearch fields to search on (e.g. ['fullName', 'shortCode'])
- defaultField (string; optional): The default field which contains the value that should be autocompleted
- sort (list; optional): How ElasticSearch should sort the results (e.g. ['_score', { createdDate: 'desc' }])
- placeholder (string; optional): Placeholder string
- suggestions (list; optional): Placeholder string
- n_submit (number; optional): Number of times the `Enter` key was pressed while the input had focus.
- n_submit_timestamp (number; optional): Last time that `Enter` was pressed.
- authUser (string; optional): Username for Elasticsearch.
- authPass (string; optional): Password for Elasticsearch.
- searchField (string; optional): Field which query endpoint is matching against (e.g. "name.edgengram")"""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, value=Component.UNDEFINED, endpoint=Component.UNDEFINED, fields=Component.UNDEFINED, defaultField=Component.UNDEFINED, sort=Component.UNDEFINED, placeholder=Component.UNDEFINED, suggestions=Component.UNDEFINED, n_submit=Component.UNDEFINED, n_submit_timestamp=Component.UNDEFINED, authUser=Component.UNDEFINED, authPass=Component.UNDEFINED, searchField=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'value', 'endpoint', 'fields', 'defaultField', 'sort', 'placeholder', 'suggestions', 'n_submit', 'n_submit_timestamp', 'authUser', 'authPass', 'searchField']
        self._type = 'ESAutosuggest'
        self._namespace = 'dash_elasticsearch_autosuggest'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'value', 'endpoint', 'fields', 'defaultField', 'sort', 'placeholder', 'suggestions', 'n_submit', 'n_submit_timestamp', 'authUser', 'authPass', 'searchField']
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
