#Holy Spells
from .holy.heal import spell as heal

#Acrane Spells
from .arcane.rf_reg import spell as rf_reg

REGISTERED_SPELLS = dict(
    heal=heal,
    rf_reg=rf_reg
)