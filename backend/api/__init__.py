API_BASE_ROUTE = '/api/'
LATEST_API_VERSION = 'v1'


def get_base_api_route(version=None):
    return API_BASE_ROUTE + LATEST_API_VERSION if version is None else version
