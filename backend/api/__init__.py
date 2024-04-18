API_BASE_ROUTE = '/api/'
LATEST_API_VERSION = 'v1'


def get_base_api_route(version=None):
    return API_BASE_ROUTE + LATEST_API_VERSION if version is None else version


def normalize_query_param(value):
    return value[0] if len(value) == 1 else value


def normalize_query_params(params):
    params_non_flat = params.to_dict(flat=False)
    return {k: normalize_query_param(v) for k, v in params_non_flat.items()}
