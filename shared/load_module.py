"""Load a Python file by its path.

Folder names such as `bubble-sort` contain hyphens, so the files inside them
cannot be imported with a normal `import` statement. Tests load them with this
helper instead. Each module gets a name derived from its path, so two files
that are both called `index.py` never replace each other.
"""

import importlib.util
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[1]


def load_module(path) -> ModuleType:
    path = Path(path).resolve()
    name = "_".join(path.relative_to(ROOT).with_suffix("").parts).replace("-", "_")
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module
