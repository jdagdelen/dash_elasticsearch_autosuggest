# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ESAutosuggest(Component):
    """A ESAutosuggest component.
ESAutosuggest is a composition with Reach Autosuggest (RA), 
which is a WAI-ARIA compliant autosuggest component built in React.
This component allows the user to connect RA with Elasticsearch
to provide real-time suggestions to the user.

Keyword arguments:
- sort (list; optional): How ElasticSearch should sort the results (e.g. ['_score', { createdDate: 'desc' }])
- endpoint (string; optional): The ElasticSearch endpoint
- n_submit (number; optional): Number of times the `Enter` key was pressed while the input had focus.
- fields (list; optional): The ElasticSearch fields to search on (e.g. ['fullName', 'shortCode'])
- n_submit_timestamp (number; optional): Last time that `Enter` was pressed.
- searchField (string; optional): Field which query endpoint is matching against (e.g. "name.edgengram")
- suggestions (list; optional): Placeholder string
- authPass (string; optional): Password for Elasticsearch.
- value (string; optional): The value displayed in the input
- authUser (string; optional): Username for Elasticsearch.
- defaultField (string; optional): The default field which contains the value that should be autocompleted
- placeholder (string; optional): Placeholder string
- id (string; optional): The ID used to identify this component in Dash callbacks

Available events: """
    @_explicitize_args
    def __init__(self, sort=Component.UNDEFINED, endpoint=Component.UNDEFINED, n_submit=Component.UNDEFINED, fields=Component.UNDEFINED, n_submit_timestamp=Component.UNDEFINED, searchField=Component.UNDEFINED, suggestions=Component.UNDEFINED, authPass=Component.UNDEFINED, value=Component.UNDEFINED, authUser=Component.UNDEFINED, defaultField=Component.UNDEFINED, placeholder=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['sort', 'endpoint', 'n_submit', 'fields', 'n_submit_timestamp', 'searchField', 'suggestions', 'authPass', 'value', 'authUser', 'defaultField', 'placeholder', 'id']
        self._type = 'ESAutosuggest'
        self._namespace = 'dash_elasticsearch_autosuggest'
        self._valid_wildcard_attributes =            []
        self.available_events = []
        self.available_properties = ['sort', 'endpoint', 'n_submit', 'fields', 'n_submit_timestamp', 'searchField', 'suggestions', 'authPass', 'value', 'authUser', 'defaultField', 'placeholder', 'id']
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

    def __repr__(self):
        if(any(getattr(self, c, None) is not None
               for c in self._prop_names
               if c is not self._prop_names[0])
           or any(getattr(self, c, None) is not None
                  for c in self.__dict__.keys()
                  if any(c.startswith(wc_attr)
                  for wc_attr in self._valid_wildcard_attributes))):
            props_string = ', '.join([c+'='+repr(getattr(self, c, None))
                                      for c in self._prop_names
                                      if getattr(self, c, None) is not None])
            wilds_string = ', '.join([c+'='+repr(getattr(self, c, None))
                                      for c in self.__dict__.keys()
                                      if any([c.startswith(wc_attr)
                                      for wc_attr in
                                      self._valid_wildcard_attributes])])
            return ('ESAutosuggest(' + props_string +
                   (', ' + wilds_string if wilds_string != '' else '') + ')')
        else:
            return (
                'ESAutosuggest(' +
                repr(getattr(self, self._prop_names[0], None)) + ')')
