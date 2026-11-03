%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% This originally taken and modified from 
% Created by Trey Hunner and modified by www.LaTeXTemplates.com
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\LoadClass[10pt,letterpaper]{article} % Font size and paper type
\usepackage{array}
\usepackage{xcolor}
\usepackage{bibentry}
\usepackage{scrextend}
\usepackage[top=1.5cm,bottom=1.7cm,left=1.9cm,right=1.9cm,footskip=0.8cm]{geometry}
\usepackage{longtable}
\usepackage{fancyhdr}
\usepackage{etoolbox}
\usepackage{colortbl}
\usepackage{titlesec}
\usepackage{datetime}
\usepackage{hyperref}
\hypersetup{colorlinks=true, urlcolor=darkBlue, linkcolor=black} % colored links instead of boxes
\usepackage{needspace}
\usepackage[
final,
letterspace=0,
stretch=10,
protrusion=true,
tracking=true,
spacing=on,
kerning=on,
expansion=true]{microtype}

% Enable changing color for horizontal line in header and footer
\newcommand{\headrulecolor}[1]{\patchcmd{\headrule}{\hrule}{\color{#1}\hrule}{}{}}
\newcommand{\footrulecolor}[1]{\patchcmd{\footrule}{\hrule}{\color{#1}\hrule}{}{}}

\newdateformat{monthyeardate}{%
  \monthname[\THEMONTH] \THEYEAR}

% Define fonts
\def\headerFont{put}  % define the header font
\def\entryFont{tmr}   % define the entry font

% Define colors
\definecolor{maroon}{RGB}{140,5,50}
\definecolor{darkMaroon}{RGB}{75,0,0}
\definecolor{darkBlue}{RGB}{0,0,153}
\definecolor{lightGray}{gray}{0.25}
\definecolor{black}{gray}{0}

% Which colors correspond to which part of the CV?
\def\nameColor{black}    % color of my name
\def\headerColor{black}  % color of section headers
\def\lineColor{black}    % color of lines
\def\marginColor{black}  % color of margin item color

% Create the fancy vertical line
\newcolumntype{L}{>{\raggedleft}p{0.11\textwidth}}
\newcolumntype{R}{p{0.88\textwidth}}
\newcommand\VRule{\color{\lineColor}\vrule width 1pt}

% Spacing between entries
\setlength{\extrarowheight}{1.5pt}
\setlength{\LTpre}{2pt}
\setlength{\LTpost}{0pt}

% Create Headers and Footers
\pagestyle{fancy}
\fancyhead{} % clear all header fields
\renewcommand{\headrulewidth}{0pt} % no line in header area
\renewcommand{\footrulewidth}{1pt}
\footrulecolor{\lineColor}

\fancyfoot{} % clear all footer fields
\fancyfoot[LE,RO]{\fontfamily{\entryFont}\selectfont\thepage}  % page number in "outer" position of footer line
\fancyfoot[RE,LO]{\lsstyle\fontfamily{\entryFont}\selectfont Benjamin E. Shanahan
	\\ {\it Curriculum Vitae}, \monthyeardate\today} % other info in "inner" position of footer line

% This changes the font of the sections
\titleformat{\section}
  {\fontfamily{\headerFont}\selectfont\Large} {\thesection}{0em}{}
\titlespacing*{\section}{0pt}{7pt}{3pt}  % left, above, below, [right]


% All of this is needed to create the horizontal gray lines...
\newlength{\Oldarrayrulewidth}
\newcommand{\Cline}[2]{%
  \noalign{\global\setlength{\Oldarrayrulewidth}{\arrayrulewidth}}%
  \noalign{\global\setlength{\arrayrulewidth}{#1}}\cline{#2}%
  \noalign{\global\setlength{\arrayrulewidth}{\Oldarrayrulewidth}}}



%-----------------
%	VARIABLE DECLARATIONS
%-----------------

\newenvironment{printHeader}[2]
{
	\begingroup
	
	{\fontfamily{\headerFont}\selectfont
	 {\Huge \noindent\sc\color{\nameColor} #1} \\
	        \noindent #2}\\
	\endgroup
}

\newenvironment{newSection}[1]{
	\Needspace{6\baselineskip}
	\section*{\color{\headerColor}#1}
	\begin{longtable}{L!{\VRule}R}
	}
	{
	\arrayrulecolor{\lineColor}\Cline{1pt}{1-2}
	\end{longtable}
	}
	
\newenvironment{two}[2]{
\leavevmode{\color{\marginColor}#1} & #2 \\
}

\newenvironment{twoBold}[2]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \\
}

\newenvironment{three}[3]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \\
}

\newenvironment{four}[4]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline #4 \\
}

\newenvironment{fourNoIta}[4]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline #4 \\
}

\newenvironment{fourIta}[4]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline \emph{#4} \\
}

\newenvironment{five}[5]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline \emph{#4} \newline #5 \\
}

\newenvironment{fiveNoIta}[5]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline #4 \newline #5 \\
}

\newenvironment{fiveOffset}[5]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \newline \emph{#4} \hfill #3 \newline #5 \\
}

\newenvironment{article}[5]{
\leavevmode{\color{\marginColor}#1} & #2. \emph{#3}. #4.\\
}


\newenvironment{abstractEntry}[6]{
\leavevmode{\color{\marginColor}#1} & {\bf #2 (#3)} \hfill #4 \newline \emph{#5}. #6 \\
}

\newenvironment{abstractEntryBasic}[6]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline \emph{#4}. #5 \\
}

\newenvironment{abstractEntryWithComments}[7]{
\leavevmode{\color{\marginColor}#1} & {\bf #2 (#3)} \hfill #4 \newline \emph{#5}. #6 \newline \hspace*{0.5cm} \emph{#7}\\
}


\newenvironment{patentEntryBasic}[4]{
\leavevmode{\color{\marginColor}#1} & #2 #3. \newline {\bf #4} \\
}


\newenvironment{chapterEntry}[5]{
\leavevmode{\color{\marginColor}#1} & #2. \emph{#3}. #4. #5 \\
}

\newenvironment{award}[5]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline \emph{#4} \newline #5 \\
}


\newenvironment{grant}[6]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline \emph{#4} \newline #5 \newline #6\\
}

\newenvironment{grantWithComment}[7]{
\leavevmode{\color{\marginColor}#1} & {\bf #2} \hfill #3 \newline \emph{#4} \newline #5 \newline #6 \newline \hspace*{0.5cm} \emph{#7}\\
}


