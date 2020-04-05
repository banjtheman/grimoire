#Holy Spells
from .holy.heal import spell as heal

#Acrane Spells
from .arcane.rf_reg import spell as rf_reg
from .arcane.svm_classifier import spell as svm_classifier
from .arcane.umap_grim import spell as umap_grim
from .arcane.fasttext_grim import spell as fasttext_grim

#Nature Spells
from .nature.histogram import spell as histogram
from .nature.heatmap import spell as heatmap
from .nature.scatter_plot import spell as scatter_plot
from .nature.bar_chart import spell as bar_chart
from .nature.line_chart import spell as line_chart
from .nature.area_chart import spell as area_chart
from .nature.stacked_bar import spell as stacked_bar
from .nature.pair_plot import spell as pair_plot

#Air spells
from .air.plot_map import spell as plot_map

#Time spells
from .time.time_bar_chart import spell as time_bar_chart


REGISTERED_SPELLS = dict(
    heal=heal,
    rf_reg=rf_reg,
    histogram = histogram,
    heatmap = heatmap,
    bar_chart = bar_chart,
    scatter_plot = scatter_plot,
    line_chart=line_chart,
    area_chart=area_chart,
    stacked_bar = stacked_bar,
    svm_classifier= svm_classifier,
    plot_map = plot_map,
    time_bar_chart = time_bar_chart,
    pair_plot = pair_plot,
    umap_grim = umap_grim,
    fasttext_grim = fasttext_grim
)
