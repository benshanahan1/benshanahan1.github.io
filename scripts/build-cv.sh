#!/bin/sh
# Compile cv/ShanahanBE_CV.tex with pdfLaTeX (TeX Live in Docker) and publish it as public/cv.pdf.
# Run it whenever the CV changes (npm run cv), then commit public/cv.pdf. The date on the CV is the day you run this.
set -e
cd "$(dirname "$0")/.."
docker run --rm -v "$PWD/cv":/cv -w /cv texlive/texlive:latest \
  latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=build ShanahanBE_CV.tex
cp cv/build/ShanahanBE_CV.pdf public/cv.pdf
echo "Wrote public/cv.pdf"
