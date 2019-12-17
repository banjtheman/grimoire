from setuptools import setup, find_packages
import logging

logging.basicConfig(level=logging.INFO)

# Getting the README Contents for Pkg Distribution
with open('README.md') as f:
    readme = f.read()

# Getting the License Contents for Pkg Distribution
with open('LICENSE') as f:
    license = f.read()

with open("requirements.txt") as f:
    install_deps = f.readlines()

setup(
    name='grim',
    description='A PyPI Package for utilizing Grimoire the open source DataOps platform',
    long_description=readme,
    author='Banjo Obayomi',
    author_email='banjtheman@gmail.com',
    url='https://github.com/banjtheman/grimoire',
    license=license,
    # setup_requires=['setuptools_scm'],
    # use_scm_version={"root": "../../", "relative_to": __file__},
    install_requires=install_deps,
    include_package_data=True,
    packages=find_packages(),
    # classifiers=[
    #     'Private :: What is Private?'
    # ],

)