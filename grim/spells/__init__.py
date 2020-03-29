#Holy Spells
from .holy.heal import spell as heal

#Acrane Spells
from .arcane.rf_reg import spell as rf_reg

#Nature Spells
from .nature.histogram import spell as histogram
from .nature.heatmap import spell as heatmap
from .nature.scatter_plot import spell as scatter_plot
from .nature.bar_chart import spell as bar_chart
from .nature.line_chart import spell as line_chart
from .nature.area_chart import spell as area_chart
from .nature.stacked_bar import spell as stacked_bar

REGISTERED_SPELLS = dict(
    heal=heal,
    rf_reg=rf_reg,
    histogram = histogram,
    heatmap = heatmap,
    bar_chart = bar_chart,
    scatter_plot = scatter_plot,
    line_chart=line_chart,
    area_chart=area_chart,
    stacked_bar = stacked_bar
)
