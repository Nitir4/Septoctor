def normalize_raw_input(raw: dict) -> dict:
    """
    UI → backend normalization
    Assumes UI already sends numeric / binary
    """
    normalized = {}
    for k, v in raw.items():
        if v is None:
            normalized[k] = 0
        else:
            normalized[k] = v
    return normalized
